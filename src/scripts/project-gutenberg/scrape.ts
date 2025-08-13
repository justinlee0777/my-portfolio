import { readdir } from 'fs/promises';
import { JSDOM } from 'jsdom';
import capitalize from 'lodash-es/capitalize';
import chunk from 'lodash-es/chunk';
import {
  IndentTransformer,
  NewlineTransformer,
  Pages,
  TextToHTMLTransformer,
} from 'prospero/server';
import {
  PagesAsIndicesOutput,
  TableOfContentsSection,
  Transformer,
} from 'prospero/types';
import { desktopStyles, mobileStyles } from '../../consts/ulysses-styles.const';
import { GutenbergScrapeConfig } from './configs/gutenberg-scrape-config.interface';

// May want to break this up by configuration objects rather than CLI arguments, because it seems every book has its own layout.

export default async function scrapeProjectGutenbergPage() {
  const [, , bookTitle, shouldWriteString] = process.argv;

  if (!bookTitle) {
    throw new Error('Specify the book you want to scrape.');
  }

  const configDir = 'configs';

  const fullConfigDir = `src/scripts/project-gutenberg/${configDir}`;

  const bookTitleRegex = new RegExp(bookTitle.split(' ').join('-'), 'i');

  const configFiles = await readdir(fullConfigDir);

  const configFile = configFiles.find(
    (configFileName) => bookTitleRegex.test(configFileName),
    bookTitleRegex
  );

  if (!configFile) {
    throw new Error(`No corresponding config for ${bookTitle}.`);
  }

  const config: GutenbergScrapeConfig = (
    await import(`./${configDir}/${configFile}`)
  ).config;

  const {
    url,
    sectionHeadingSelector,
    contentContainerSelector,
    ignore,
    transform = (textContent) => textContent,
  } = config;

  const pageResponse = await fetch(url);

  const html = await pageResponse.text();

  const jsdom = new JSDOM(html);

  const { document } = jsdom.window;

  let containers: Array<Element>;

  if (contentContainerSelector) {
    containers = [...document.querySelectorAll(contentContainerSelector)];
  } else {
    containers = [document.body];
  }

  const sections: Array<{
    title: string;
    content: Array<string>;
  }> = [];

  for (const container of containers) {
    for (const child of container.children) {
      const sectionFound = child.matches(sectionHeadingSelector);

      if (sectionFound) {
        sections.push({
          title: (child.textContent ?? '').trim(),
          content: [],
        });
      }

      const mostRecentSection = sections.at(-1);

      if (!mostRecentSection) {
        continue;
      } else if (ignore && child.matches(ignore)) {
        continue;
      }

      const { content } = mostRecentSection;

      content.push(transform((child.textContent ?? '').trim()));
    }
  }

  const shouldWrite = /true/i.test(shouldWriteString);

  if (shouldWrite) {
    console.log('uploading...');

    const processors = function (): Array<Transformer> {
      return [
        new TextToHTMLTransformer(),
        new IndentTransformer(5),
        new NewlineTransformer({ beginningSections: 4, betweenParagraphs: 0 }),
      ];
    };

    const fontLocation = '/Bookerly/Bookerly-Regular.ttf';

    const sectionChunks = chunk(sections, 3);

    interface ProsperoResponse {
      mobile: PagesAsIndicesOutput;
      desktop: PagesAsIndicesOutput;
      sectionTitle: string;
    }

    const responses: Array<ProsperoResponse> = [];

    for (const batchedSections of sectionChunks) {
      responses.push(
        ...(await Promise.all(
          batchedSections.map(async (section) => {
            const text = section.content.join('\n');

            return {
              mobile: await new Pages(mobileStyles, text, processors(), {
                fontLocation,
              }).getDataAsIndices(),
              desktop: await new Pages(desktopStyles, text, processors(), {
                fontLocation,
              }).getDataAsIndices(),
              sectionTitle: section.title,
            };
          })
        ))
      );
    }

    let desktopCompiledText = '';
    let mobileCompiledText = '';

    let mobile: PagesAsIndicesOutput['pages'] = [];
    let mobileIndex = 0;

    let desktop: PagesAsIndicesOutput['pages'] = [];
    let desktopIndex = 0;

    const mobileChapters: Array<TableOfContentsSection> = [],
      desktopChapters: Array<TableOfContentsSection> = [];

    responses.forEach((response) => {
      const chapterTitle = response.sectionTitle
        .split('-')
        .map(capitalize)
        .join(' ');

      mobileChapters.push({
        title: chapterTitle,
        pageNumber: mobile.length,
      });
      desktopChapters.push({
        title: chapterTitle,
        pageNumber: desktop.length,
      });

      desktopCompiledText += response.desktop.text;
      mobileCompiledText += response.mobile.text;

      response.mobile.pages.forEach((mobilePage) => {
        mobile.push({
          beginIndex: mobileIndex + mobilePage.beginIndex,
          endIndex: mobileIndex + mobilePage.endIndex,
        });
      });

      response.desktop.pages.forEach((desktopPage) => {
        desktop.push({
          beginIndex: desktopIndex + desktopPage.beginIndex,
          endIndex: desktopIndex + desktopPage.endIndex,
        });
      });

      // Add an empty page.
      desktop.push({
        beginIndex: desktop.at(-1)!.endIndex,
        endIndex: desktop.at(-1)!.endIndex,
      });

      mobileIndex += response.mobile.pages.at(-1)!.endIndex;
      desktopIndex += response.desktop.pages.at(-1)!.endIndex;
    });

    const mobilePages: PagesAsIndicesOutput & {
      chapters: Array<TableOfContentsSection>;
    } = {
      pages: mobile,
      pageStyles: mobileStyles,
      text: mobileCompiledText,
      chapters: mobileChapters,
    };

    const desktopPages: PagesAsIndicesOutput & {
      chapters: Array<TableOfContentsSection>;
    } = {
      pages: desktop,
      pageStyles: desktopStyles,
      text: desktopCompiledText,
      chapters: desktopChapters,
    };

    const url = 'https://iamjustinlee.com/api';

    try {
      const uploadedTitle = bookTitle
        .split(' ')
        .map((token) => token.toLowerCase())
        .join('-');

      const mobileRequest = fetch(
        `${url}/prospero/texts/${uploadedTitle}/mobile`,
        {
          method: 'PUT',
          body: JSON.stringify(mobilePages),
        }
      );

      const desktopRequest = fetch(
        `${url}/prospero/texts/${uploadedTitle}/desktop`,
        {
          method: 'PUT',
          body: JSON.stringify(desktopPages),
        }
      );

      const requests = await Promise.all([mobileRequest, desktopRequest]);

      console.log(
        `mobile request: ${requests[0].status} desktop request: ${requests[1].status}`
      );
    } catch (e) {
      throw new Error('Error in uploading pages', e);
    }
  } else {
    console.log('printing results of run', sections);
  }
}

if (require.main === module) {
  scrapeProjectGutenbergPage()
    .then(() => {
      console.log('success');
      process.exit(0);
    })
    .catch((error) => {
      console.log('Error', error);
      process.exit(1);
    });

  // save to S3?
}

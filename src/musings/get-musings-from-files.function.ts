import { readdirSync, readFile } from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import { remark } from 'remark';
import html from 'remark-html';

import { MusingConfig } from './components/musing/musing.config';

const fileDirectory = join(process.cwd(), 'src/musings/musing-files');

export namespace MusingFiles {
  let musingConfigs: Array<MusingConfig>;

  export async function getMusingsFromFiles(): Promise<Array<MusingConfig>> {
    if (!musingConfigs) {
      musingConfigs = await loadMusingsFromFiles();
    }

    return musingConfigs;
  }

  export async function loadMusingsFromFiles(): Promise<Array<MusingConfig>> {
    const asyncLoadedFileContent = readdirSync(fileDirectory) // Get all saved .md files
      .filter((filename) => filename.includes('.md'))
      .map((markdownFile) => {
        return new Promise((resolve, reject) =>
          readFile(join(fileDirectory, markdownFile), 'utf8', (err, file) =>
            err ? reject(err) : resolve(file)
          )
        ).then((file: string) => {
          const result = matter(file);

          return (
            remark()
              // As the files are only built on my local machine, I feel this is safe. If ever this site needs an SSR solution, this needs to be properly sanitized.
              .use(html, { sanitize: false })
              .process(result.content)
              .then((content) => {
                const contentHtml = content.toString();

                return {
                  slug: result.data.slug,
                  display: {
                    contentHtml,
                    title: result.data.title,
                    description: result.data.description,
                  },
                  seo: {
                    title: result.data.seoTitle,
                    description: result.data.seoDescription,
                  },
                  timestamp: new Date(result.data.timestamp),
                };
              })
          );
        });
      });

    const fileContent = await Promise.all(asyncLoadedFileContent);

    return fileContent
      .sort((a, b) => {
        return b.timestamp.getTime() - a.timestamp.getTime();
      })
      .map((config) => {
        const newConfig = {
          ...config,
          display: {
            ...config.display,
            timestamp: config.timestamp.toDateString(),
          },
        };

        delete newConfig.timestamp;

        return newConfig;
      });
  }
}

import 'dotenv/config';

import { readdir, readFile, writeFile } from 'fs/promises';
import { extname } from 'path';

import { ImageAnnotatorClient } from '@google-cloud/vision';
import getOpenAIApi from '../../api/openai/open-ai.client';

async function uploadText() {
  const dir = '/Users/justinlee/Dropbox/Hopscotch';

  const { chat } = getOpenAIApi();

  let chapterFolders = await readdir(dir, { withFileTypes: true });

  chapterFolders = chapterFolders.filter((file) => file.isDirectory());

  for (const chapterFolder of chapterFolders) {
    const chapterFolderDir = `${dir}/${chapterFolder.name}`;
    let filenames = await readdir(chapterFolderDir);

    const filenamePattern = /page-(\d+)/;

    const getPageNumber = (filename: string): number => {
      const results = filename.match(filenamePattern);

      if (!results) {
        return -1;
      }

      const [, pageNumberString] = results;

      return Number(pageNumberString);
    };

    filenames = filenames
      .filter((filename) => {
        const extension = extname(filename);

        return extension.toLowerCase() === '.jpg';
      })
      .sort((nameA, nameB) => {
        return getPageNumber(nameA) - getPageNumber(nameB);
      });
/*
    const client = new ImageAnnotatorClient();

    const requests = await Promise.all(
      filenames.map(async (filename) => ({
        image: {
          content: await readFile(`${chapterFolderDir}/${filename}`, {
            encoding: 'base64',
          }),
        },
        features: [{ type: 'TEXT_DETECTION' as const, maxResults: 1 }],
      }))
    );

    console.log(JSON.stringify({
      requests
    }, null, 2))

    let responses: any = await client.batchAnnotateImages({
      requests,
    });

    responses = responses.filter(Boolean);

    for (const imageResponse of responses) {
      for (const subResponse of imageResponse.responses) {
        for (const textAnnotation of subResponse.textAnnotations) {
          console.log(JSON.stringify({ textAnnotation }, null, 2))
        }
      }
    }
*/

    let chapterText = '';

    for (const filename of filenames) {
      console.log(`working on ${filename}...`)

      const base64String = await readFile(`${chapterFolderDir}/${filename}`, { encoding: 'base64' })

      const response = await chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: [
              { type: "text", text: "Respond only with the text in this image. If you can't, tell me why you can't parse the image." },
              {
                type: "image_url",
                image_url: {
                  "url": `data:image/jpeg;base64,${base64String}`,
                },
              },
            ],
          }
        ],
      });

      console.log(JSON.stringify({
        response,
        filename,
      }, null, 2))

      chapterText += response.choices.at(0).message.content;
    }

    await writeFile(`./${chapterFolder.name}.txt`, chapterText);
  }
}

if (require.main === module) {
  uploadText()
    .then(() => {
      console.log('success');
      process.exit(0);
    })
    .catch((error) => {
      console.log('Error', error);
      process.exit(1);
    });
}

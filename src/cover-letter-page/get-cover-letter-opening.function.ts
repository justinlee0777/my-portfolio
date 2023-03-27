import { readFile } from 'fs';
import { join } from 'path';
import { remark } from 'remark';
import html from 'remark-html';

/**
 * @returns html string
 */
export async function getCoverLetterOpening(): Promise<string> {
  const fileDirectory = join(
    process.cwd(),
    'src/cover-letter-page/files/cover-letter-opening.md'
  );

  return new Promise((resolve, reject) =>
    readFile(fileDirectory, 'utf8', (err, file) =>
      err ? reject(err) : resolve(file)
    )
  ).then((file: string) => {
    return remark()
      .use(html, { sanitize: false })
      .process(file)
      .then((content) => content.toString());
  });
}

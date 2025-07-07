import { readFile } from 'node:fs';

import {
  IndentTransformer,
  NewlineTransformer,
  Pages,
  TextToHTMLTransformer,
} from 'prospero/server';
import { Transformer } from 'prospero/types';

export default async function workOnChapter({
  mobileStyles,
  desktopStyles,
  filename,
}) {
  const text = await new Promise<string>((resolve, reject) =>
    readFile(filename, 'utf8', (err, file) =>
      err ? reject(err) : resolve(file)
    )
  );

  const processors = function (): Array<Transformer> {
    return [
      new TextToHTMLTransformer(),
      new IndentTransformer(5),
      new NewlineTransformer({ beginningSections: 4, betweenParagraphs: 0 }),
    ];
  };

  const fontLocation = '/Bookerly/Bookerly-Regular.ttf';

  console.log(`working on ${filename}...`);

  const desktop = await new Pages(desktopStyles, text, processors(), {
    fontLocation,
  }).getDataAsIndices();

  const mobile = await new Pages(mobileStyles, text, processors(), {
    fontLocation,
  }).getDataAsIndices();

  console.log(`done with ${filename}`);

  return {
    mobile,
    desktop,
  };
}

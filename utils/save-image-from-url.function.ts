import { createWriteStream } from 'fs';
import { IncomingMessage } from 'http';
import { get } from 'https';

const assetsFolder = './public';

export async function saveImageFromUrl(
  url: string,
  fileToCreate: string
): Promise<void> {
  const createdFile = `${assetsFolder}/${fileToCreate}`;

  const response = await new Promise<IncomingMessage>((resolve) =>
    get(url, resolve)
  );

  const file = createWriteStream(createdFile);

  response.pipe(file);

  await new Promise((resolve) =>
    file.on('finish', () => resolve(file.close()))
  );
}

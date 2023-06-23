import { readFile as fsReadFile } from 'fs';

export default function readFile(fileLocation: string): Promise<string> {
  return new Promise((resolve, reject) =>
    fsReadFile(fileLocation, 'utf8', (err, file) =>
      err ? reject(err) : resolve(file)
    )
  );
}

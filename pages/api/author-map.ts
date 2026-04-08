import { NextApiRequest, NextApiResponse } from 'next';
import { promisify } from 'util';
import { gzip } from 'zlib';

import { getAuthorMapData } from '../../src/utils/author-map/utils';

const gzipAsync = promisify(gzip);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const authorMapData = await getAuthorMapData();
    const compressed = await gzipAsync(JSON.stringify(authorMapData));

    res
      .setHeader('Content-Encoding', 'gzip')
      .setHeader('Content-Type', 'application/json')
      .status(200)
      .send(compressed);
  } else {
    res.status(404).end();
  }
}

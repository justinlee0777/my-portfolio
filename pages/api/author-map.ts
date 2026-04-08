import { NextApiRequest, NextApiResponse } from 'next';

import { getAuthorMapData } from '../../src/utils/author-map/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const authorMapData = await getAuthorMapData();

    res.status(200).json(authorMapData);
  } else {
    res.status(404).end();
  }
}

import type { NextApiRequest, NextApiResponse } from 'next';
import getProsperoPages from '../../../../../src/page-utils/prospero/get-prospero-pages.function';
import uploadProsperoPages from '../../../../../src/page-utils/prospero/upload-prospero-pages.function';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const result = await getProsperoPages('ulysses', 'desktop', 1, 10);

    res.status(200).json(result);
  } else if (req.method === 'PUT') {
    await uploadProsperoPages('ulysses', 'desktop', JSON.parse(req.body));

    res.status(204).end();
  } else {
    res.status(404).end();
  }
}

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
    const {
      pageNumber,
      pageSize,
    } = req.query;

    let finalPageNumber = Number(pageNumber);
    let finalPageSize = Number(pageSize);

    if (!finalPageNumber) {
      finalPageNumber = 1;
    }

    if (!finalPageSize) {
      finalPageSize = 10;
    }


    const result = await getProsperoPages('ulysses', 'mobile', finalPageNumber, finalPageSize);

    res.status(200).json(result);
  } else if (req.method === 'PUT') {
    await uploadProsperoPages('ulysses', 'mobile', JSON.parse(req.body));

    res.status(204).end();
  } else {
    res.status(404).end();
  }
}

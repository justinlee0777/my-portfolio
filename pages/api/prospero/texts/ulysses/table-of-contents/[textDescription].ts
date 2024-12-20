import type { NextApiRequest, NextApiResponse } from 'next';
import { ProsperoTableOfContentsModel } from '../../../../../../src/models/prospero-table-of-contents.model';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const result = await ProsperoTableOfContentsModel.findOne({
      textTitle: 'ulysses',
      textDescription: req.query.textDescription,
    });

    res.status(200).json(result);
  } else {
    res.status(404).end();
  }
}

import type { NextApiRequest, NextApiResponse } from 'next';
import { ProsperoTableOfContentsModel } from '../../../../../../src/models/prospero-table-of-contents.model';
import connectToMongoDB from '../../../../../../src/page-utils/prospero/connect-to-mongodb.function';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    await connectToMongoDB();

    const result = await ProsperoTableOfContentsModel.findOne({
      textTitle: req.query.textTitle,
      textDescription: req.query.textDescription,
    });

    res.status(200).json(result);
  } else {
    res.status(404).end();
  }
}

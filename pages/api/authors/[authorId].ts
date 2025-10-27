import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthorModel } from '../../../src/models/author.model';
import connectToMongoDB from '../../../src/page-utils/prospero/connect-to-mongodb.function';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    await connectToMongoDB();

    const authorId = req.query.authorId;
    const exists = await AuthorModel.exists({ id: authorId });
    const stringifiedAuthor = req.body;
    if (exists) {
      await AuthorModel.updateOne(
        { id: authorId },
        JSON.parse(stringifiedAuthor)
      );

      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } else {
    res.status(404).end();
  }
}

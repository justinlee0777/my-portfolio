import type { Author } from 'author-map-ui';
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
      const parsedAuthor: Author = JSON.parse(stringifiedAuthor);
      delete parsedAuthor['_id'];

      await AuthorModel.updateOne({ id: authorId }, parsedAuthor);

      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } else {
    res.status(404).end();
  }
}

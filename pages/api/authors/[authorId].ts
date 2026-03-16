import type { Author } from 'author-map-ui';
import type { NextApiRequest, NextApiResponse } from 'next';

import { ZodError } from 'zod';
import { AuthorModel, AuthorValidator } from '../../../src/models/author.model';
import connectToMongoDB from '../../../src/page-utils/prospero/connect-to-mongodb.function';
import { validateAuthorMapUser } from '../../../src/utils/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const authToken = req.cookies.auth;

    if (!(authToken && (await validateAuthorMapUser(authToken)))) {
      res.status(401).json({
        message: `You are not allowed to modify this resource.`,
      });
      return;
    }

    const stringifiedAuthor = req.body;
    const parsedAuthor: Author = JSON.parse(stringifiedAuthor);

    try {
      AuthorValidator.parse(parsedAuthor);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).end();
        return;
      }
    }

    await connectToMongoDB();

    const authorId = req.query.authorId;
    const exists = await AuthorModel.exists({ id: authorId });

    if (exists) {
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

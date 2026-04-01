import type { Author } from 'author-map-ui/models';
import { Types } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ZodError } from 'zod';
import { cookieName } from '../../src/consts/author-map-webauthn';
import { AuthorModel, AuthorValidator } from '../../src/models/author.model';
import connectToMongoDB from '../../src/page-utils/prospero/connect-to-mongodb.function';
import { validateSession } from '../../src/utils/webauthn';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    await connectToMongoDB();

    const authors = await AuthorModel.find().lean();

    res.status(200).json(authors);
  } else if (req.method === 'POST') {
    const authToken = req.cookies[cookieName];

    if (!(authToken && (await validateSession(authToken)))) {
      res.status(401).json({
        message: `You are not allowed to modify this resource.`,
      });
      return;
    }

    const parsedAuthor = JSON.parse(req.body);

    try {
      AuthorValidator.parse(parsedAuthor);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).end();
        return;
      }
    }

    await connectToMongoDB();

    const id = new Types.ObjectId();

    const author: Author = {
      ...parsedAuthor,
      id: id.toString(),
    };

    await AuthorModel.create({ ...author, _id: id });

    res.status(201).json(author);
  } else {
    res.status(404).end();
  }
}

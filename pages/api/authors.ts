import type { Author } from 'author-map-ui/models';
import { Types } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthorModel } from '../../src/models/author.model';
import connectToMongoDB from '../../src/page-utils/prospero/connect-to-mongodb.function';
import { validateAuthorMapUser } from '../../src/utils/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    await connectToMongoDB();

    const authors = await AuthorModel.find().lean();

    res.status(200).json(authors);
  } else if (req.method === 'POST') {
    const authToken = req.cookies.auth;

    if (!(authToken && (await validateAuthorMapUser(authToken)))) {
      res.status(401).json({
        message: `You are not allowed to modify this resource.`,
      });
      return;
    }

    await connectToMongoDB();

    const id = new Types.ObjectId();

    const author: Author = {
      ...JSON.parse(req.body),
      id: id.toString(),
    };

    await AuthorModel.create({ ...author, _id: id });

    res.status(201).json(author);
  } else {
    res.status(404).end();
  }
}

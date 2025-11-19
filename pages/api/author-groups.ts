import type { AuthorGroup } from 'author-map-ui/models';
import { Types } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthorGroupModel } from '../../src/models/author.model';
import connectToMongoDB from '../../src/page-utils/prospero/connect-to-mongodb.function';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    await connectToMongoDB();

    const authorGroups = await AuthorGroupModel.find().lean();

    res.status(200).json(authorGroups);
  } else if (req.method === 'POST') {
    await connectToMongoDB();

    const id = new Types.ObjectId();

    const author: AuthorGroup = {
      ...JSON.parse(req.body),
      id: id.toString(),
    };

    await AuthorGroupModel.create({ ...author, _id: id });

    res.status(201).json(author);
  } else {
    res.status(404).end();
  }
}

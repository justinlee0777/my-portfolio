import type { AuthorGroup } from 'author-map-ui/models';
import { Types } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

import { sessionName } from '../../src/consts/author-map-webauthn';
import { AuthorGroupModel } from '../../src/models/author.model';
import connectToMongoDB from '../../src/page-utils/prospero/connect-to-mongodb.function';
import { validateSession } from '../../src/utils/webauthn';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    await connectToMongoDB();

    const authorGroups = await AuthorGroupModel.find().lean();

    res.status(200).json(authorGroups);
  } else if (req.method === 'POST') {
    const authToken = req.cookies[sessionName];

    if (!(authToken && (await validateSession(authToken)))) {
      res.status(401).json({
        message: `You are not allowed to modify this resource.`,
      });
      return;
    }

    await connectToMongoDB();

    const id = new Types.ObjectId();

    const group: AuthorGroup = {
      ...JSON.parse(req.body),
      id: id.toString(),
    };

    await AuthorGroupModel.create({ ...group, _id: id });

    res.status(201).json(group);
  } else {
    res.status(404).end();
  }
}

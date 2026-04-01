import type { MajorEvent } from 'author-map-ui/models';
import { Types } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { sessionName } from '../../src/consts/author-map-webauthn';
import { AuthorMajorEventModel } from '../../src/models/author.model';
import connectToMongoDB from '../../src/page-utils/prospero/connect-to-mongodb.function';
import { validateSession } from '../../src/utils/webauthn';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    await connectToMongoDB();

    const authorMajorEvents = await AuthorMajorEventModel.find().lean();

    res.status(200).json(authorMajorEvents);
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

    const event: MajorEvent = {
      ...JSON.parse(req.body),
      id: id.toString(),
    };

    await AuthorMajorEventModel.create({ ...event, _id: id });

    res.status(201).json(event);
  } else {
    res.status(404).end();
  }
}

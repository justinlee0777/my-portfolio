import type { AuthorGroup } from 'author-map-ui';
import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthorGroupModel } from '../../../src/models/author.model';
import connectToMongoDB from '../../../src/page-utils/prospero/connect-to-mongodb.function';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    await connectToMongoDB();

    const groupId = req.query.groupId;
    const exists = await AuthorGroupModel.exists({ id: groupId });
    const stringifiedGroup = req.body;
    if (exists) {
      const parsedGroup: AuthorGroup = JSON.parse(stringifiedGroup);
      delete parsedGroup['_id'];

      await AuthorGroupModel.updateOne({ id: groupId }, parsedGroup);

      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } else {
    res.status(404).end();
  }
}

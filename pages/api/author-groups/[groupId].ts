import type { AuthorGroup } from 'author-map-ui';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ZodError } from 'zod';

import {
  AuthorGroupModel,
  AuthorGroupValidator,
} from '../../../src/models/author.model';
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

    const stringifiedGroup = req.body;

    const parsedGroup: AuthorGroup = JSON.parse(stringifiedGroup);

    try {
      AuthorGroupValidator.parse(parsedGroup);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).end();
        return;
      }
    }

    await connectToMongoDB();

    const groupId = req.query.groupId;
    const exists = await AuthorGroupModel.exists({ id: groupId });

    if (exists) {
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

import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthorMapUserModel } from '../../../src/models/author-map-user.model';
import connectToMongoDB from '../../../src/page-utils/prospero/connect-to-mongodb.function';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    await connectToMongoDB();

    const authorization = req.headers.authorization;

    if (!authorization) {
      res.status(400).json({
        message: 'No authorization header sent.',
      });
      return;
    }

    const [username, password] = Buffer.from(authorization, 'base64')
      .toString()
      .split(':');

    const user = await AuthorMapUserModel.findOne({ username });

    let exists = false;

    if (user) {
      exists = user.validatePassword(password);
    }

    if (exists) {
      res.setHeader(
        'Set-Cookie',
        `auth=${authorization}; Path=/; Max-Age=86400; SameSite=Lax`
      );

      res.status(200).end();
    } else {
      res.status(400).json({
        message: 'Username / password combo does not exist.',
      });
    }
  } else {
    res.status(404).end();
  }
}

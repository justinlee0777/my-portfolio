import { parse } from 'cookie';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

import { sessionName } from '../../../src/consts/author-map-webauthn';
import { AuthorMapCredentialModel } from '../../../src/models/author-map-user.model';
import connectToMongoDB from '../../../src/page-utils/prospero/connect-to-mongodb.function';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const cookies = parse(req.headers.cookie || '');
    const session = cookies[sessionName];

    if (!session) {
      return res.status(401).json({ message: 'No session.' });
    }

    const JWT_SECRET = process.env.AUTHOR_AUTH_SECRET!;

    const payload = jwt.verify(session, JWT_SECRET) as { userId: string };

    await connectToMongoDB();

    const credential = await AuthorMapCredentialModel.findOne({
      id: payload.userId,
    });

    if (!credential) {
      return res.status(401).json({ message: 'Invalid payload.' });
    }

    return res.status(200).end();
  } else {
    res.status(404).end();
  }
}

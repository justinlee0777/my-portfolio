import { generateAuthenticationOptions } from '@simplewebauthn/server';
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

import {
  cookieName,
  rpID,
  urlPath,
} from '../../../../src/consts/author-map-webauthn';
import { AuthorMapUserModel } from '../../../../src/models/author-map-user.model';
import connectToMongoDB from '../../../../src/page-utils/prospero/connect-to-mongodb.function';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    if (!req.body) {
      res.status(400).end();
      return;
    }

    const { username } = JSON.parse(req.body);

    await connectToMongoDB();

    let user = await AuthorMapUserModel.findOne({ username }).lean();

    if (!user) {
      res.status(400).end();
      return;
    }

    const options = await generateAuthenticationOptions({
      rpID,
      userVerification: 'preferred',
    });

    res.setHeader(
      'Set-Cookie',
      serialize(
        cookieName,
        JSON.stringify({ challenge: options.challenge, username }),
        {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          path: urlPath,
          maxAge: 300,
        }
      )
    );

    res.json(options);
  } else {
    res.status(404).end();
  }
}

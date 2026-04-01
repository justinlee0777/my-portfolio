import { generateRegistrationOptions } from '@simplewebauthn/server';
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

import {
  cookieName,
  rpID,
  rpName,
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

    const { username, token } = JSON.parse(req.body);

    await connectToMongoDB();

    let user = await AuthorMapUserModel.exists({ username, token }).lean();

    if (!user) {
      res.status(400).end();
      return;
    }

    const options = await generateRegistrationOptions({
      rpName,
      rpID,
      userID: crypto.getRandomValues(new Uint8Array(16)),
      userName: username,
      attestationType: 'none',
      authenticatorSelection: {
        userVerification: 'preferred',
      },
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

    return res.json(options);
  } else {
    res.status(404).end();
  }
}

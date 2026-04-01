import { verifyRegistrationResponse } from '@simplewebauthn/server';
import { parse, serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

import {
  cookieName,
  expectedOrigin,
  rpID,
  urlPath,
} from '../../../../src/consts/author-map-webauthn';
import {
  AuthorMapCredentialModel,
  AuthorMapUserModel,
} from '../../../../src/models/author-map-user.model';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const cookies = parse(req.headers.cookie || '');
    const optionsCookie = cookies[cookieName];

    if (!optionsCookie) {
      res.status(400).end();
      return;
    }

    const body = req.body;

    const response = JSON.parse(body);

    const { challenge, username } = JSON.parse(optionsCookie);

    const verification = await verifyRegistrationResponse({
      response,
      expectedChallenge: challenge,
      expectedOrigin,
      expectedRPID: rpID,
    });

    if (verification.verified) {
      // Clear cookie after use
      res.setHeader(
        'Set-Cookie',
        serialize(cookieName, '', {
          httpOnly: true,
          path: urlPath,
          maxAge: 0,
        })
      );

      await AuthorMapUserModel.updateOne({ username }, { token: null });

      const credental = new AuthorMapCredentialModel({
        username,
        publicKey: Buffer.from(
          verification.registrationInfo.credential.publicKey
        ).toString('base64url'),
        id: verification.registrationInfo.credential.id,
        counter: verification.registrationInfo.credential.counter,
      });
      await credental.save();

      res.status(201).end();
    } else {
      res.status(400).end();
    }
  } else {
    res.status(404).end();
  }
}

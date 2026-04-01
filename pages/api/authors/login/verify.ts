import { verifyAuthenticationResponse } from '@simplewebauthn/server';
import { parse, serialize } from 'cookie';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  cookieName,
  expectedOrigin,
  rpID,
  sessionName,
  urlPath,
} from '../../../../src/consts/author-map-webauthn';
import {
  AuthorMapCredentialModel,
  AuthorMapUserModel,
} from '../../../../src/models/author-map-user.model';
import connectToMongoDB from '../../../../src/page-utils/prospero/connect-to-mongodb.function';

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

    await connectToMongoDB();

    const user = await AuthorMapUserModel.findOne({ username }).lean();

    const credential = await AuthorMapCredentialModel.findOne({
      username,
      id: response.id,
    }).lean();

    if (!(user && credential)) {
      res.status(400).end();
      return;
    }

    const verification = await verifyAuthenticationResponse({
      response,
      expectedChallenge: challenge,
      expectedOrigin,
      expectedRPID: rpID,
      credential: {
        id: credential.id,
        publicKey: new Uint8Array(
          Buffer.from(credential.publicKey, 'base64url')
        ),
        counter: credential.counter,
      },
    });

    if (!verification.verified) {
      return res.status(401).json({ ok: false });
    }

    await AuthorMapCredentialModel.updateOne(
      { id: credential.id },
      { counter: verification.authenticationInfo.newCounter }
    );

    // issue session
    const token = jwt.sign(
      { userId: credential.id },
      process.env.AUTHOR_AUTH_SECRET!,
      { expiresIn: '1h' }
    );

    const resetChallenge = serialize(cookieName, '', {
      httpOnly: true,
      path: urlPath,
      maxAge: 0,
    });

    const sessionCookie = serialize(sessionName, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: urlPath,
      maxAge: 60 * 60,
    });

    res.setHeader('Set-Cookie', [resetChallenge, sessionCookie]);

    res.status(200).end();
  } else {
    res.status(404).end();
  }
}

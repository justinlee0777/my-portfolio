import {
  startAuthentication,
  startRegistration,
} from '@simplewebauthn/browser';
import jwt from 'jsonwebtoken';

export async function register(username: string, token: string) {
  const optionsResponse = await fetch('/api/authors/register/options', {
    method: 'POST',
    body: JSON.stringify({ username, token }),
  });

  if (!optionsResponse.ok) {
    throw new Error('Options failed.');
  }

  const options = await optionsResponse.json();

  const credential = await startRegistration(options);

  const verifyResponse = await fetch('/api/authors/register/verify', {
    method: 'POST',
    body: JSON.stringify(credential),
  });

  if (!verifyResponse.ok) {
    throw new Error('Verification failed.');
  }
}

export async function login(username: string) {
  const optionsResponse = await fetch('/api/authors/login/options', {
    method: 'POST',
    body: JSON.stringify({ username }),
  });

  if (!optionsResponse.ok) {
    throw new Error('Options failed.');
  }

  const options = await optionsResponse.json();

  const credential = await startAuthentication(options);

  const verifyResponse = await fetch('/api/authors/login/verify', {
    method: 'POST',
    body: JSON.stringify(credential),
  });

  if (!verifyResponse.ok) {
    throw new Error('Verification failed.');
  }
}

export async function validateSession(token: string): Promise<boolean> {
  return Boolean(jwt.verify(token, process.env.AUTHOR_AUTH_SECRET!));
}

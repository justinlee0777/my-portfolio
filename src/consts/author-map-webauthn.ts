export const rpName = 'Author Map';

export const rpID =
  process.env.NODE_ENV === 'production' ? 'iamjustinlee.com' : 'localhost';

export const expectedOrigin =
  process.env.NODE_ENV === 'production'
    ? 'https://www.iamjustinlee.com'
    : 'localhost';

export const cookieName = '__Host-webauthn_challenge';

export const sessionName = '__Host-session';

export const urlPath = '/';

import { Head, Html, Main, NextScript } from 'next/document';
import { type JSX } from 'react';

export default function Document(): JSX.Element {
  return (
    <Html lang="en">
      <Head>
        <meta name="author" content="Justin Lee, leej40@outlook.com" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="favicon-16x16.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

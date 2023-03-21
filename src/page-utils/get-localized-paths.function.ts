import { locales } from './locales.config';

export async function getStaticPaths() {
  return {
    paths: [
      ...locales.map((locale) => ({
        params: {
          locale: locale.code,
        },
      })),
    ],
    fallback: false,
  };
}

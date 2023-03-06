import { getLocalizedStaticProps } from '../../page-utils/get-localized-homepage-props.function';
import { locales } from '../../page-utils/locales.config';

export { default } from '../../homepage/index';

export function getStaticProps({ params }) {
  return getLocalizedStaticProps(params.locale)();
}

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

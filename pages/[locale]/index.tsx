import { getLocalizedStaticProps } from '../../page-utils/get-localized-homepage-props.function';

export { default } from '../../homepage/index';

export function getStaticProps({ params }) {
  return getLocalizedStaticProps(params.locale)();
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { locale: 'en' } }, { params: { locale: 'fr' } }],
    fallback: false,
  };
}

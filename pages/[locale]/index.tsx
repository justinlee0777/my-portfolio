import { getLocalizedStaticProps } from '../../src/page-utils/get-localized-homepage-props.function';

export { default } from '../../src/homepage/index';

export function getStaticProps({ params }) {
  return getLocalizedStaticProps(params.locale)();
}

export { getStaticPaths } from '../../src/page-utils/get-localized-paths.function';

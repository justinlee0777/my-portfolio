import { getLocalizedStaticProps } from '../../page-utils/get-localized-homepage-props.function';

export { default } from '../../homepage/index';

export function getStaticProps({ params }) {
  return getLocalizedStaticProps(params.locale)();
}

export { getStaticPaths } from '../../page-utils/get-localized-paths.function';

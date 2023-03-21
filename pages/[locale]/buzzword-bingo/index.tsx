import { getLocalizedStaticProps } from '../../../src/page-utils/get-localized-buzzword-bingo-props.function';

export { default } from '../../../src/buzzword-bingo-page/index';

export function getStaticProps({ params }) {
  return getLocalizedStaticProps(params.locale)();
}

export { getStaticPaths } from '../../../src/page-utils/get-localized-paths.function';

import { getLocalizedStaticProps } from '../../../src/page-utils/get-localized-buzzword-bingo-props.function';

export { default } from '../../../src/buzzword-bingo-page/buzzword-bingo-page';
export { getStaticPaths } from '../../../src/page-utils/get-localized-paths.function';

export function getStaticProps({ params }) {
  return getLocalizedStaticProps(params.locale)();
}

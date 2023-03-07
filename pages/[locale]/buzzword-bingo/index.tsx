import { getLocalizedStaticProps } from '../../../page-utils/get-localized-buzzword-bingo-props.function';

export { default } from '../../../buzzword-bingo-page/index';

export function getStaticProps({ params }) {
  return getLocalizedStaticProps(params.locale)();
}

export { getStaticPaths } from '../../../page-utils/get-localized-paths.function';

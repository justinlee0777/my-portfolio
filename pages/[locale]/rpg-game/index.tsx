import { getLocalizedStaticProps } from '../../../src/page-utils/get-localized-rpg-game-props.function';

export { default } from '../../../src/rpg-game-page/index';

export function getStaticProps({ params }) {
  return getLocalizedStaticProps(params.locale)();
}

export { getStaticPaths } from '../../../src/page-utils/get-localized-paths.function';

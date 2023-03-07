import { getLocalizedStaticProps } from '../../../page-utils/get-localized-rpg-game-props.function';

export { default } from '../../../rpg-game-page/index';

export function getStaticProps({ params }) {
  return getLocalizedStaticProps(params.locale)();
}

export { getStaticPaths } from '../../../page-utils/get-localized-paths.function';

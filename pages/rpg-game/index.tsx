import { getLocalizedStaticProps } from '../../page-utils/get-localized-rpg-game-props.function';

export { default } from '../../rpg-game-page/index';

export const getStaticProps = getLocalizedStaticProps('en');

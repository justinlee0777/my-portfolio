import { getLocalizedStaticProps } from '../../src/page-utils/get-localized-rpg-game-props.function';

export { default } from '../../src/rpg-game-page/index';

export const getStaticProps = getLocalizedStaticProps('en');

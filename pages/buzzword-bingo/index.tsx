import { getLocalizedStaticProps } from '../../src/page-utils/get-localized-buzzword-bingo-props.function';

export { default } from '../../src/buzzword-bingo-page/buzzword-bingo-page';

export const getStaticProps = getLocalizedStaticProps('en');

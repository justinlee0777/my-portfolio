import { getLocalizedStaticProps } from '../../page-utils/get-localized-buzzword-bingo-props.function';

export { default } from '../../buzzword-bingo-page/index';

export const getStaticProps = getLocalizedStaticProps('en');

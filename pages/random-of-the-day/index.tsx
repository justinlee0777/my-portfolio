import getLocalizedStaticProps from '../../src/page-utils/random-of-the-day/get-localized-props.function';
export { default } from '../../src/random-of-the-day/random-of-the-day-page';

export const getStaticProps = getLocalizedStaticProps('en');

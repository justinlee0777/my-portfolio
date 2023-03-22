import { getLocalizedStaticProps } from '../../src/page-utils/get-localized-random-of-the-day-props.function';

export { default } from '../../src/random-of-the-day/index';

export const getStaticProps = getLocalizedStaticProps('en');

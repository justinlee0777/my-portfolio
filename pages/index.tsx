import { getLocalizedStaticProps } from '../src/page-utils/get-localized-homepage-props.function';

export { default } from '../src/homepage/index';

export const getStaticProps = getLocalizedStaticProps('en');

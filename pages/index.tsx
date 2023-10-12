import { getLocalizedStaticProps } from '../src/page-utils/homepage/get-localized-homepage-props.function';

export { default } from '../src/homepage/homepage';

export const getStaticProps = getLocalizedStaticProps('en');

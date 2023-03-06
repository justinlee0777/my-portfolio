import { getLocalizedStaticProps } from '../page-utils/get-localized-homepage-props.function';

export { default } from '../homepage/index';

export const getStaticProps = getLocalizedStaticProps('en');

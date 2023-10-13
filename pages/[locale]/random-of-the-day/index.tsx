import getLocalizedStaticProps from '../../../src/page-utils/random-of-the-day/get-localized-props.function';
export { getStaticPaths } from '../../../src/page-utils/get-localized-paths.function';
export { default } from '../../../src/random-of-the-day/random-of-the-day-page';

export function getStaticProps({ params }) {
  return getLocalizedStaticProps(params.locale)();
}

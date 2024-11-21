import { getBasePageProps } from '../get-base-page-props.function';

export async function getStaticProps() {
  return {
    props: await getBasePageProps('en', '', true),
  };
}

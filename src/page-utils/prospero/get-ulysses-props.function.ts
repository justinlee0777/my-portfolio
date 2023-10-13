import {
  getBaseProsperoProps,
  ProsperoPageProps,
} from './get-base-props.function';

export type UlyssesPageProps = ProsperoPageProps;

export async function getStaticProps(): Promise<{
  props: UlyssesPageProps;
}> {
  return {
    props: await getBaseProsperoProps(),
  };
}

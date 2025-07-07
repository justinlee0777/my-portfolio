import {
  getBaseProsperoProps,
  ProsperoPageProps,
} from './get-base-props.function';

export type AChristmasCarol = ProsperoPageProps;

export async function getStaticProps(): Promise<{
  props: AChristmasCarol;
}> {
  return {
    props: await getBaseProsperoProps(),
  };
}

import {
  getBaseProsperoProps,
  ProsperoPageProps,
} from './get-base-props.function';

export interface DijkstraEssayPageProps extends ProsperoPageProps {}

export async function getStaticProps(): Promise<{
  props: DijkstraEssayPageProps;
}> {
  const props = await getBaseProsperoProps();

  return {
    props,
  };
}

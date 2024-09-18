import {
  getBaseProsperoProps,
  ProsperoPageProps,
} from './get-base-props.function';

export interface TempestPageProps extends ProsperoPageProps {}

export async function getStaticProps(): Promise<{ props: TempestPageProps }> {
  const props = await getBaseProsperoProps();

  return {
    props,
  };
}

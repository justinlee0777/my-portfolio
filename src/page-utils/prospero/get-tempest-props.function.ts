import {
  getBaseProsperoProps,
  ProsperoPageProps,
} from './get-base-props.function';

export interface TempestPageProps extends ProsperoPageProps {}

export async function getStaticProps(
  args
): Promise<{ props: TempestPageProps }> {
  const props = await getBaseProsperoProps(args);

  return {
    props,
  };
}

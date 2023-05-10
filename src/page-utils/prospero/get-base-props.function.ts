import {
  BasePageProps,
  getBasePageProps,
} from '../get-base-page-props.function';
import ProsperoConfig from '../../prospero/prospero.config';
import defaultProsperoConfig from '../../prospero/default-prospero.config';

export interface ProsperoPageProps extends BasePageProps {
  config: ProsperoConfig;
}

export async function getBaseProsperoProps(): Promise<ProsperoPageProps> {
  const baseProps = await getBasePageProps('en', '', true);

  return {
    ...baseProps,
    config: defaultProsperoConfig,
  };
}

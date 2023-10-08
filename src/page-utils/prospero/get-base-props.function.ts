import defaultProsperoConfig from '../../prospero/default-prospero.config';
import ProsperoConfig from '../../prospero/prospero.config';
import {
  BasePageProps,
  getBasePageProps,
} from '../get-base-page-props.function';

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

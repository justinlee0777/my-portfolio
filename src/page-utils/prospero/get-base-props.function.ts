import { capitalize } from 'lodash-es';
import defaultProsperoConfig from '../../prospero/default-prospero.config';
import ProsperoConfig from '../../prospero/prospero.config';
import {
  BasePageProps,
  getBasePageProps,
} from '../get-base-page-props.function';

export interface ProsperoPageProps extends BasePageProps {
  book: {
    title: string;
    urlSlug: string;
  };
  config: ProsperoConfig;
}

export async function getBaseProsperoProps({
  params,
}): Promise<ProsperoPageProps> {
  const baseProps = await getBasePageProps('en', '', true);

  const slug: string = params?.bookTitle ?? 'the-tempest';

  return {
    ...baseProps,
    config: defaultProsperoConfig,
    book: {
      title: slug.split('-').map(capitalize).join(' '),
      urlSlug: slug,
    },
  };
}

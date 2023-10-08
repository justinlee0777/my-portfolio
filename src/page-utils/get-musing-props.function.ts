import { MusingConfig } from '../musings/components/musing/musing.config';
import { MusingFiles } from '../musings/get-musings-from-files.function';
import {
  BasePageProps,
  getBasePageProps,
} from './get-base-page-props.function';

export interface MusingPageProps extends BasePageProps {
  config: MusingConfig;
}

export async function getStaticProps({
  params,
}): Promise<{ props: MusingPageProps }> {
  const files = await MusingFiles.getMusingsFromFiles();
  const config = files.find((file) => file.slug === params.musing);

  const baseProps = await getBasePageProps('en', '', true);

  return {
    props: {
      ...baseProps,
      config,
    },
  };
}

import { MusingFiles } from '../musings/get-musings-from-files.function';
import { defaultMusingsPageConfig } from '../musings/default-musings-page.config';
import { MusingsPageConfig } from '../musings/musings-page.config';
import { MusingConfig } from '../musings/components/musing/musing.config';
import {
  BasePageProps,
  getBasePageProps,
} from './get-base-page-props.function';

export interface MusingsPageProps extends BasePageProps {
  config: MusingsPageConfig;
  musings: Array<MusingConfig>;
}

export async function getStaticProps(): Promise<{ props: MusingsPageProps }> {
  const musings = await MusingFiles.getMusingsFromFiles();

  const baseProps = await getBasePageProps('en', '', true);

  return {
    props: {
      ...baseProps,
      config: defaultMusingsPageConfig,
      musings,
    },
  };
}

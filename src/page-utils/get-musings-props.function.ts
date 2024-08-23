import { defaultMusingsPageConfig } from '../musings/default-musings-page.config';
import { MusingFiles } from '../musings/get-musings-from-files.function';
import MusingsProps from '../musings/models/musings-props.interface';
import {
  BasePageProps,
  getBasePageProps,
} from './get-base-page-props.function';

export type MusingsPageProps = BasePageProps & MusingsProps;

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

import { MusingFiles } from '../musings/get-musings-from-files.function';
import MusingProps from '../musings/models/musing-props.interface';
import {
  BasePageProps,
  getBasePageProps,
} from './get-base-page-props.function';

export type MusingPageProps = BasePageProps & Omit<MusingProps, 'font'>;

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
      showAIForm: params.musing === 'ai-form',
    },
  };
}

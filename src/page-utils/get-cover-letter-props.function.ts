import { CoverLetterConfig } from '../cover-letter-page/cover-letter.config';
import { defaultCoverLetterConfig } from '../cover-letter-page/default-cover-letter.config';
import { getCoverLetterOpening } from '../cover-letter-page/get-cover-letter-opening.function';
import {
  BasePageProps,
  getBasePageProps,
} from './get-base-page-props.function';

export interface CoverLetterPageProps extends BasePageProps {
  config: CoverLetterConfig;
  opening: string;
}

export async function getStaticProps(): Promise<{
  props: CoverLetterPageProps;
}> {
  const baseProps = await getBasePageProps('en', '', true);

  const coverLetterOpening = await getCoverLetterOpening();

  return {
    props: {
      ...baseProps,
      hideHeader: true,

      config: defaultCoverLetterConfig,
      opening: coverLetterOpening,
    },
  };
}

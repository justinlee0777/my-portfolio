import { CoverLetterConfig } from '../cover-letter-page/cover-letter.config';
import { defaultCoverLetterConfig } from '../cover-letter-page/default-cover-letter.config';
import { coverLetterPageConfig } from '../cover-letter-page/default-page.config';
import {
  BasePageProps,
  getBasePageProps,
} from './get-base-page-props.function';

export interface CoverLetterPageProps extends BasePageProps {
  config: CoverLetterConfig;
}

export async function getStaticProps(): Promise<{
  props: CoverLetterPageProps;
}> {
  const baseProps = await getBasePageProps('en', '', true);

  const coverLetterProps: CoverLetterPageProps = {
    ...baseProps,
    pageConfig: coverLetterPageConfig,
    navbar: {
      reverse: true,
    },

    config: defaultCoverLetterConfig,
  };

  delete coverLetterProps.openSettingsConfig;

  return {
    props: coverLetterProps,
  };
}

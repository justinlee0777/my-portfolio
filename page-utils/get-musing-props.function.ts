import { pageConfig } from '../config/default-page.config';
import { defaultOpenSettingsConfig } from '../config/default-open-settings.config';
import { loadUnitTestResult } from '../utils/load-unit-test-result.function';
import { MusingFiles } from '../musings/get-musings-from-files.function';
import { MusingConfig } from '../musings/components/musing/musing.config';
import { UnitTestResults } from '../contexts/unit-test.context';
import { OpenSettingsConfig } from '../config/open-settings.config';
import { PageConfig } from '../config/page.config';

export interface MusingPageProps {
  locale: string;
  route: string;
  config: MusingConfig;
  pageConfig: PageConfig;
  openSettingsConfig: OpenSettingsConfig;
  unitTestResult: UnitTestResults;
}

export async function getStaticProps({
  params,
}): Promise<{ props: MusingPageProps }> {
  const files = await MusingFiles.getMusingsFromFiles();
  const config = files.find((file) => file.slug === params.musing);

  return {
    props: {
      locale: 'en',
      route: '',
      config,
      pageConfig,
      openSettingsConfig: defaultOpenSettingsConfig,
      unitTestResult: loadUnitTestResult(),
    },
  };
}

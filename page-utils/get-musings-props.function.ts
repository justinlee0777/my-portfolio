import { pageConfig } from '../config/default-page.config';
import { defaultOpenSettingsConfig } from '../config/default-open-settings.config';
import { loadUnitTestResult } from '../utils/load-unit-test-result.function';
import { MusingFiles } from '../musings/get-musings-from-files.function';
import { defaultMusingsPageConfig } from '../musings/default-musings-page.config';
import { MusingsPageConfig } from '../musings/musings-page.config';
import { MusingConfig } from '../musings/components/musing/musing.config';
import { PageConfig } from '../config/page.config';
import { OpenSettingsConfig } from '../config/open-settings.config';
import { UnitTestResults } from '../contexts/unit-test.context';

export interface MusingsPageProps {
  locale: string;
  route: string;
  config: MusingsPageConfig;
  musings: Array<MusingConfig>;
  pageConfig: PageConfig;
  openSettingsConfig: OpenSettingsConfig;
  unitTestResult: UnitTestResults;
}

export async function getStaticProps(): Promise<{ props: MusingsPageProps }> {
  const musings = await MusingFiles.getMusingsFromFiles();

  return {
    props: {
      locale: 'en',
      route: '',
      config: defaultMusingsPageConfig,
      musings,
      pageConfig,
      openSettingsConfig: defaultOpenSettingsConfig,
      unitTestResult: loadUnitTestResult(),
    },
  };
}

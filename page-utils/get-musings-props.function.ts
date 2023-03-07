import { pageConfig } from '../config/default-page.config';
import { defaultOpenSettingsConfig } from '../config/default-open-settings.config';
import { loadUnitTestResult } from '../utils/load-unit-test-result.function';
import { MusingFiles } from '../musings/get-musings-from-files.function';
import { defaultMusingsPageConfig } from '../musings/default-musings-page.config';

export async function getStaticProps() {
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

import { pageConfig } from '../config/default-page.config';
import { defaultOpenSettingsConfig } from '../config/default-open-settings.config';
import { loadUnitTestResult } from '../utils/load-unit-test-result.function';
import { MusingFiles } from '../musings/get-musings-from-files.function';

export async function getStaticProps({ params }) {
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

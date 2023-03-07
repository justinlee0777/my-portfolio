import { pageConfig } from '../config/default-page.config';
import { defaultOpenSettingsConfig } from '../config/default-open-settings.config';
import { loadUnitTestResult } from '../utils/load-unit-test-result.function';

export function getStaticProps() {
  return {
    props: {
      locale: 'en',
      route: '',
      pageConfig,
      openSettingsConfig: defaultOpenSettingsConfig,
      unitTestResult: loadUnitTestResult(),
    },
  };
}

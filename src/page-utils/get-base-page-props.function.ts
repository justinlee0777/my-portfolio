import { defaultOpenSettingsConfig } from '../config/default-open-settings.config';
import { pageConfig } from '../config/default-page.config';
import { OpenSettingsConfig } from '../config/open-settings.config';
import { PageConfig } from '../config/page.config';
import { UnitTestResults } from '../contexts/unit-test.context';
import { loadUnitTestResult } from '../utils/load-unit-test-result.function';
import { translateObject } from '../utils/translate-object.function';
import { getTranslationKeys as getOpenSettingsTranslationKeys } from '../config/open-settings.config';

export interface NavbarConfig {
  hide?: boolean;
  /** Show on the bottom instead. */
  reverse?: boolean;
}

export interface BasePageProps {
  locale: string;
  route: string;
  pageConfig: PageConfig;
  unitTestResult: UnitTestResults;
  apiUrl: string;

  navbar?: NavbarConfig;
  openSettingsConfig?: OpenSettingsConfig;
}

export async function getBasePageProps(
  locale: string,
  route = '',
  showSettings?: boolean
): Promise<BasePageProps> {
  const props: BasePageProps = {
    locale,
    route,
    pageConfig,
    unitTestResult: loadUnitTestResult(),
    // apiUrl: 'https://api.iamjustinlee.com',
    apiUrl: 'http://localhost:9292',
  };

  if (showSettings) {
    let openSettingsConfig = defaultOpenSettingsConfig;

    if (locale !== 'en') {
      openSettingsConfig = await translateObject(
        openSettingsConfig,
        getOpenSettingsTranslationKeys(),
        locale
      );
    }

    props.openSettingsConfig = openSettingsConfig;
  }

  return props;
}

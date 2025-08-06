import getOpenSettingsTranslationKeys from '../components/navigation-pane/constants/translation-keys.const';
import NavigationPaneConfig from '../components/navigation-pane/models/navigation-pane-config.interface';
import { defaultNavigationPaneConfig } from '../config/default-open-settings.config';
import getPageConfig from '../config/default-page.config';
import { UnitTestResults } from '../contexts/unit-test/unit-test-results.model';
import PageConfig from '../models/page-config.model';
import { loadUnitTestResult } from '../utils/load-unit-test-result.function';
import { translateObject } from '../utils/translate-object.function';

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
  openSettingsConfig?: NavigationPaneConfig;
}

export async function getBasePageProps(
  locale: string,
  route = '',
  showSettings?: boolean
): Promise<BasePageProps> {
  const props: BasePageProps = {
    locale,
    route,
    pageConfig: getPageConfig(locale),
    unitTestResult: loadUnitTestResult(),
    apiUrl: 'https://api.iamjustinlee.com',
  };

  if (showSettings) {
    let openSettingsConfig = defaultNavigationPaneConfig;

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

import { defaultOpenSettingsConfig } from '../config/default-open-settings.config';
import { pageConfig } from '../config/default-page.config';
import {
  OpenSettingsConfig,
  getTranslationKeys as getOpenSettingsTranslationKeys,
} from '../config/open-settings.config';
import { PageConfig } from '../config/page.config';
import { UnitTestResults } from '../contexts/unit-test.context';
import { getTranslationKeys } from '../rpg-game-page/rpg-game-page.config';
import { defaultRpgGamePageConfig } from '../rpg-game-page/default-rpg-game-page.config';
import { RpgGamePageConfig } from '../rpg-game-page/rpg-game-page.config';
import { loadUnitTestResult } from '../utils/load-unit-test-result.function';
import { translateObject } from '../utils/translate-object.function';

export interface RpgGamePageProps {
  locale: string;
  route: string;
  pageConfig: PageConfig;
  rpgGameConfig: RpgGamePageConfig;
  openSettingsConfig: OpenSettingsConfig;
  unitTestResult: UnitTestResults;
}

export function getLocalizedStaticProps(
  locale: string
): () => Promise<{ props: RpgGamePageProps }> {
  return async function getStaticProps() {
    let translatedConfig = defaultRpgGamePageConfig;
    let translatedOpenSettingsConfig = defaultOpenSettingsConfig;

    if (locale !== 'en') {
      translatedConfig = await translateObject(
        translatedConfig,
        getTranslationKeys(),
        locale
      );

      translatedOpenSettingsConfig = await translateObject(
        translatedOpenSettingsConfig,
        getOpenSettingsTranslationKeys(),
        locale
      );
    }

    return {
      props: {
        locale,
        route: '/rpg-game',
        pageConfig,
        rpgGameConfig: translatedConfig,
        openSettingsConfig: translatedOpenSettingsConfig,
        unitTestResult: loadUnitTestResult(),
      },
    };
  };
}

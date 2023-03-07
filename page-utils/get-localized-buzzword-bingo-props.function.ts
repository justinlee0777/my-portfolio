import {
  BuzzwordBingoConfig,
  getTranslationKeys,
} from '../buzzword-bingo-page/buzzword-bingo.config';
import { defaultBuzzwordBingoConfig } from '../buzzword-bingo-page/default-buzzword-bingo.config';
import { defaultOpenSettingsConfig } from '../config/default-open-settings.config';
import { pageConfig } from '../config/default-page.config';
import {
  OpenSettingsConfig,
  getTranslationKeys as getOpenSettingsTranslationKeys,
} from '../config/open-settings.config';
import { PageConfig } from '../config/page.config';
import { UnitTestResults } from '../contexts/unit-test.context';
import { loadUnitTestResult } from '../utils/load-unit-test-result.function';
import { translateObject } from '../utils/translate-object.function';

export interface BuzzwordBingoPageProps {
  locale: string;
  route: string;
  pageConfig: PageConfig;
  buzzwordBingoConfig: BuzzwordBingoConfig;
  unitTestResult: UnitTestResults;
  openSettingsConfig: OpenSettingsConfig;
}

export function getLocalizedStaticProps(
  locale: string
): () => Promise<{ props: BuzzwordBingoPageProps }> {
  return async function getStaticProps() {
    let translatedConfig = defaultBuzzwordBingoConfig;
    let translatedOpenSettingsConfig = defaultOpenSettingsConfig;

    if (locale !== 'en') {
      translatedConfig = await translateObject(
        translatedConfig,
        getTranslationKeys(translatedConfig),
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
        route: '/buzzword-bingo',
        pageConfig,
        buzzwordBingoConfig: translatedConfig,
        openSettingsConfig: translatedOpenSettingsConfig,
        unitTestResult: loadUnitTestResult(),
      },
    };
  };
}

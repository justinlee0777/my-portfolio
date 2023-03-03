import { defaultBuzzwordBingoConfig } from '../../buzzword-bingo-page/default-buzzword-bingo.config';
import { defaultOpenSettingsConfig } from '../../config/default-open-settings.config';
import { pageConfig } from '../../config/default-page.config';
import { loadUnitTestResult } from '../../utils/load-unit-test-result.function';

export { default } from '../../buzzword-bingo-page/index';

export async function getStaticProps() {
  return {
    props: {
      pageConfig,
      buzzwordBingoConfig: defaultBuzzwordBingoConfig,
      openSettingsConfig: defaultOpenSettingsConfig,
      unitTestResult: loadUnitTestResult(),
    },
  };
}

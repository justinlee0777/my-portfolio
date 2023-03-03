import { defaultOpenSettingsConfig } from '../../config/default-open-settings.config';
import { pageConfig } from '../../config/default-page.config';
import { defaultRpgGamePageConfig } from '../../rpg-game-page/default-rpg-game-page.config';
import { loadUnitTestResult } from '../../utils/load-unit-test-result.function';

export { default } from '../../rpg-game-page/index';

export async function getStaticProps() {
  return {
    props: {
      pageConfig,
      rpgGameConfig: defaultRpgGamePageConfig,
      openSettingsConfig: defaultOpenSettingsConfig,
      unitTestResult: loadUnitTestResult(),
    },
  };
}

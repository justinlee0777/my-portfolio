import { defaultOpenSettingsConfig } from '../../config/default-open-settings.config';
import { pageConfig } from '../../config/default-page.config';

export { default } from '../../buzzword-bingo-page/index';

export async function getStaticProps() {
  return {
    props: {
      pageConfig,
      openSettingsConfig: defaultOpenSettingsConfig,
    },
  };
}

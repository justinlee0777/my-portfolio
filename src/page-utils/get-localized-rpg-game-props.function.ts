import { getTranslationKeys } from '../rpg-game-page/rpg-game-page.config';
import { defaultRpgGamePageConfig } from '../rpg-game-page/default-rpg-game-page.config';
import { RpgGamePageConfig } from '../rpg-game-page/rpg-game-page.config';
import { translateObject } from '../utils/translate-object.function';
import {
  BasePageProps,
  getBasePageProps,
} from './get-base-page-props.function';

export interface RpgGamePageProps extends BasePageProps {
  rpgGameConfig: RpgGamePageConfig;
}

export function getLocalizedStaticProps(
  locale: string
): () => Promise<{ props: RpgGamePageProps }> {
  return async function getStaticProps() {
    let translatedConfig = defaultRpgGamePageConfig;

    if (locale !== 'en') {
      translatedConfig = await translateObject(
        translatedConfig,
        getTranslationKeys(),
        locale
      );
    }

    const baseProps = await getBasePageProps(locale, '/rpg-game', true);

    return {
      props: {
        ...baseProps,
        rpgGameConfig: translatedConfig,
      },
    };
  };
}

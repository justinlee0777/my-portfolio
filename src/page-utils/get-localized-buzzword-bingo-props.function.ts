import buzzwordBingoConfig from '../buzzword-bingo-page/default-buzzword-bingo.config';
import BuzzwordBingoConfig from '../buzzword-bingo-page/models/buzzword-bingo-config.model';
import { getTranslationKeys } from '../buzzword-bingo-page/translations/get-translation-keys.function';
import { translateObject } from '../utils/translate-object.function';
import {
  BasePageProps,
  getBasePageProps,
} from './get-base-page-props.function';

export interface BuzzwordBingoPageProps extends BasePageProps {
  buzzwordBingoConfig: BuzzwordBingoConfig;
}

export function getLocalizedStaticProps(
  locale: string
): () => Promise<{ props: BuzzwordBingoPageProps }> {
  return async function getStaticProps() {
    let translatedConfig = buzzwordBingoConfig;

    if (locale !== 'en') {
      translatedConfig = await translateObject(
        translatedConfig,
        getTranslationKeys(translatedConfig),
        locale
      );
    }

    const baseProps = await getBasePageProps(locale, '/buzzword-bingo', true);

    return {
      props: {
        ...baseProps,
        buzzwordBingoConfig: translatedConfig,
      },
    };
  };
}

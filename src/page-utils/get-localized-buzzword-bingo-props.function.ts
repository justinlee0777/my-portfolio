import {
  BuzzwordBingoConfig,
  getTranslationKeys,
} from '../buzzword-bingo-page/buzzword-bingo.config';
import { defaultBuzzwordBingoConfig } from '../buzzword-bingo-page/default-buzzword-bingo.config';
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
    let translatedConfig = defaultBuzzwordBingoConfig;

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

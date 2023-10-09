import buzzwordBingoConfig from '../../buzzword-bingo-page/default-buzzword-bingo.config';
import { getTranslationKeys } from '../../buzzword-bingo-page/translations/get-translation-keys.function';
import { translateObject } from '../../utils/translate-object.function';
import { getBasePageProps } from '../get-base-page-props.function';
import BuzzwordBingoPageProps from './buzzword-bingo-page-props.model';

export default function getLocalizedStaticProps(
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

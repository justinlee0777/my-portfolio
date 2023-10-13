import defaultRandomOfTheDayConfig from '../../random-of-the-day/default-random-of-the-day.config';
import { getTranslationKeys } from '../../random-of-the-day/translations/get-translation-keys.function';
import { translateObject } from '../../utils/translate-object.function';
import { getBasePageProps } from '../get-base-page-props.function';
import RandomOfTheDayPageProps from './random-of-the-day-pages-props.interface';

export default function getLocalizedStaticProps(
  locale: string
): () => Promise<{ props: RandomOfTheDayPageProps }> {
  return async function getStaticProps() {
    let translatedConfig = defaultRandomOfTheDayConfig;

    if (locale !== 'en') {
      translatedConfig = await translateObject(
        translatedConfig,
        getTranslationKeys(translatedConfig),
        locale
      );
    }

    const baseProps = await getBasePageProps(
      locale,
      '/random-of-the-day',
      true
    );

    return {
      props: {
        ...baseProps,
        randomOfTheDayConfig: translatedConfig,
      },
    };
  };
}

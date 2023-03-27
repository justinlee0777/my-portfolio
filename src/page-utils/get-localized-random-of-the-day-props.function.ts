import { defaultRandomOfTheDayConfig } from '../random-of-the-day/default-random-of-the-day.config';
import {
  getTranslationKeys,
  RandomOfTheDayConfig,
} from '../random-of-the-day/random-of-the-day.config';
import { translateObject } from '../utils/translate-object.function';
import {
  BasePageProps,
  getBasePageProps,
} from './get-base-page-props.function';

export interface RandomOfTheDayPageProps extends BasePageProps {
  randomOfTheDayConfig: RandomOfTheDayConfig;
}

export function getLocalizedStaticProps(
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

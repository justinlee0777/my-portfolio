import { defaultRandomOfTheDayConfig } from '../random-of-the-day/default-random-of-the-day.config';
import { RandomOfTheDayConfig } from '../random-of-the-day/random-of-the-day.config';
import {
  BasePageProps,
  getBasePageProps,
} from './get-base-page-props.function';

export interface RandomOfTheDayPageProps extends BasePageProps {
  randomOfTheDayConfig: RandomOfTheDayConfig;
  randomOfTheDayApiUrl: string;
}

export function getLocalizedStaticProps(
  locale: string
): () => Promise<{ props: RandomOfTheDayPageProps }> {
  return async function getStaticProps() {
    const baseProps = await getBasePageProps(
      locale,
      '/random-of-the-day',
      true
    );

    return {
      props: {
        ...baseProps,
        randomOfTheDayConfig: defaultRandomOfTheDayConfig,
        randomOfTheDayApiUrl:
          'http://randomoftheday-env.eba-qewtxjhx.us-east-2.elasticbeanstalk.com',
      },
    };
  };
}

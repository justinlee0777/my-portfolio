import styles from './index.module.scss';

import Head from 'next/head';

import { RandomOfTheDayConfig } from './random-of-the-day.config';
import RandomPoemOfTheDay from './utilities/random-poem-of-the-day/random-poem-of-the-day';

export interface RandomOfTheDayPageProps {
  randomOfTheDayConfig: RandomOfTheDayConfig;
  randomOfTheDayApiUrl: string;
}

export default function RandomOfTheDayPage({
  randomOfTheDayConfig,
  randomOfTheDayApiUrl,
}: RandomOfTheDayPageProps): JSX.Element {
  return (
    <div className={styles.randomOfTheDayContent}>
      <Head>
        <title>{randomOfTheDayConfig.seo.title}</title>
        <meta
          name="description"
          content={randomOfTheDayConfig.seo.description}
        />
        <meta property="og:title" content={randomOfTheDayConfig.seo.title} />
        <meta
          property="og:description"
          content={randomOfTheDayConfig.seo.description}
        />
      </Head>
      <h1>Random of the Day</h1>
      <main>
        {randomOfTheDayConfig.textContent.description.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
        <RandomPoemOfTheDay
          header={randomOfTheDayConfig.textContent.poemOfTheDay.header}
          randomOfTheDayApiUrl={randomOfTheDayApiUrl}
        />
      </main>
    </div>
  );
}

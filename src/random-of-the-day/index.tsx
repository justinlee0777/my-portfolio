import styles from './index.module.scss';

import { useEffect, useState } from 'react';
import Head from 'next/head';

import Slide from '../components/slide/slide';
import LoadingScreen from '../components/loading-screen/loading-screen';
import { Poem } from './poem.interface';
import { RandomOfTheDayConfig } from './random-of-the-day.config';

export interface RandomOfTheDayPageProps {
  randomOfTheDayConfig: RandomOfTheDayConfig;
  randomOfTheDayApiUrl: string;
}

export default function RandomOfTheDayPage({
  randomOfTheDayConfig,
  randomOfTheDayApiUrl,
}: RandomOfTheDayPageProps): JSX.Element {
  const [data, setData] = useState<Poem | null>(null);

  useEffect(() => {
    fetch(`${randomOfTheDayApiUrl}/poem`)
      .then((response) => response.json())
      .then((body) => {
        setData(body);
      });
  }, []);

  let content: JSX.Element;

  if (!data) {
    content = <LoadingScreen />;
  } else {
    content = (
      <section>
        <h3>{data.title}</h3>
        <p>{data.author}</p>
        {data.translator && <p>Translated by {data.translator}</p>}
        <div className={styles.poemSeparator}></div>
        {data.lines.map((line, i) => (
          <p className={styles.poemLine} key={i}>
            {line}
          </p>
        ))}
      </section>
    );
  }

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
      </main>
      <Slide className={styles.slide}>
        <>
          <h2>{randomOfTheDayConfig.textContent.poemOfTheDay.header}</h2>
          {content}
        </>
      </Slide>
    </div>
  );
}

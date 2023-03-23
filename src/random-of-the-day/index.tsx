import styles from './index.module.scss';

import Head from 'next/head';
import { useState } from 'react';

import {
  RandomOfTheDayConfig,
  RandomThing,
  RandomType,
} from './random-of-the-day.config';
import RandomPoemOfTheDay from './utilities/random-poem-of-the-day/random-poem-of-the-day';
import RandomFactOfTheDay from './utilities/random-fact-of-the-day/random-fact-of-the-day';

export interface RandomOfTheDayPageProps {
  randomOfTheDayConfig: RandomOfTheDayConfig;
  randomOfTheDayApiUrl: string;
}

interface RandomThingSetting extends RandomThing {
  shown: boolean;
  setShown: (state: boolean) => void;
}

export default function RandomOfTheDayPage({
  randomOfTheDayConfig,
  randomOfTheDayApiUrl,
}: RandomOfTheDayPageProps): JSX.Element {
  const [poemShown, setPoemShown] = useState(false);
  const [factShown, setFactShown] = useState(false);

  const settings: Array<RandomThingSetting> =
    randomOfTheDayConfig.textContent.randoms.map((random) => {
      let shown: boolean;
      let setShown: (state: boolean) => void;

      switch (random.type) {
        case RandomType.POEM:
          shown = poemShown;
          setShown = setPoemShown;
          break;
        case RandomType.FACT:
          shown = factShown;
          setShown = setFactShown;
          break;
      }

      return { ...random, shown, setShown };
    });

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
        {settings.map((setting) => {
          const checkboxId = `random-of-the-day-${setting.type}`;

          return (
            <div key={setting.type}>
              <input
                id={checkboxId}
                type="checkbox"
                checked={setting.shown}
                onChange={() => setting.setShown(!setting.shown)}
              />
              <label htmlFor={checkboxId}>{setting.text}</label>
            </div>
          );
        })}
        {poemShown && (
          <RandomPoemOfTheDay
            key={RandomType.POEM}
            header={randomOfTheDayConfig.textContent.poemOfTheDay.header}
            randomOfTheDayApiUrl={randomOfTheDayApiUrl}
          />
        )}
        {factShown && (
          <RandomFactOfTheDay
            key={RandomType.FACT}
            {...randomOfTheDayConfig.textContent.factOfTheDay}
            randomOfTheDayApiUrl={randomOfTheDayApiUrl}
          />
        )}
      </main>
    </div>
  );
}

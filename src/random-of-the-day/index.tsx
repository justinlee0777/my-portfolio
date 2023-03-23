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
import FieldSet from '../components/fieldset/fieldset';
import OrderableList from '../components/orderable-list/orderable-list';

export interface RandomOfTheDayPageProps {
  randomOfTheDayConfig: RandomOfTheDayConfig;
  randomOfTheDayApiUrl: string;
}

interface RandomThingSetting extends RandomThing {
  shown: boolean;
  setShown: (state: boolean) => void;
  element: JSX.Element;
}

export default function RandomOfTheDayPage({
  randomOfTheDayConfig,
  randomOfTheDayApiUrl,
}: RandomOfTheDayPageProps): JSX.Element {
  const [poemShown, setPoemShown] = useState(false);
  const [factShown, setFactShown] = useState(false);
  const [randomOrder, setRandomOrder] = useState<Array<RandomType> | null>(
    null
  );

  const settings: Array<RandomThingSetting> =
    randomOfTheDayConfig.textContent.randoms.map(createRandomThingSetting);

  const randomCheckboxes = (
    <FieldSet legend="Randoms">
      <>
        {settings.map((setting) => {
          const checkboxId = `random-of-the-day-${setting.type}`;

          return (
            <div className={styles.randomCheckbox} key={setting.type}>
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
      </>
    </FieldSet>
  );

  let addedRandoms: Array<RandomThingSetting> = settings.filter(
    (setting) => setting.shown
  );

  if (randomOrder?.length === addedRandoms.length) {
    addedRandoms = randomOrder.map((randomType) => {
      return addedRandoms.find(
        (addedRandom) => addedRandom.type === randomType
      );
    });
  }

  const reorderRandoms = (
    <OrderableList
      className={styles.orderedRandoms}
      listElements={addedRandoms.map((random) => ({
        value: random.type,
        element: <span>{random.text}</span>,
      }))}
      onReorder={setRandomOrder as (items: Array<string>) => void}
    ></OrderableList>
  );

  const addedRandomElements: Array<JSX.Element> = addedRandoms.map(
    (setting) => setting.element
  );

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
      <h1>{randomOfTheDayConfig.textContent.header}</h1>
      <main>
        {randomOfTheDayConfig.textContent.description.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </main>
      {randomCheckboxes}
      {reorderRandoms}
      {addedRandomElements}
    </div>
  );

  function createRandomThingSetting(
    randomThing: RandomThing
  ): RandomThingSetting {
    let shown: boolean;
    let setShown: (state: boolean) => void;
    let element: JSX.Element;

    switch (randomThing.type) {
      case RandomType.POEM:
        shown = poemShown;
        setShown = setPoemShown;
        element = (
          <RandomPoemOfTheDay
            key={RandomType.POEM}
            header={randomOfTheDayConfig.textContent.poemOfTheDay.header}
            randomOfTheDayApiUrl={randomOfTheDayApiUrl}
          />
        );
        break;
      case RandomType.FACT:
        shown = factShown;
        setShown = setFactShown;
        element = (
          <RandomFactOfTheDay
            key={RandomType.FACT}
            {...randomOfTheDayConfig.textContent.factOfTheDay}
            randomOfTheDayApiUrl={randomOfTheDayApiUrl}
          />
        );
        break;
    }

    return { ...randomThing, shown, setShown, element };
  }
}

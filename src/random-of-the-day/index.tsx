import styles from './index.module.scss';

import Head from 'next/head';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

import {
  RandomOfTheDayConfig,
  RandomThing,
  RandomType,
} from './random-of-the-day.config';
import RandomPoemOfTheDay from './sections/random-poem-of-the-day/random-poem-of-the-day';
import RandomFactOfTheDay from './sections/random-fact-of-the-day/random-fact-of-the-day';
import FieldSet from '../components/fieldset/fieldset';
import OrderableList from '../components/orderable-list/orderable-list';
import {
  getRandomOfTheDayConfig,
  setRandomOfTheDayConfig,
} from './utils/random-of-the-day-config.function';

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
  const [descriptionShown, setDescriptionShown] = useState(true);
  const [poemShown, setPoemShown] = useState(false);
  const [factShown, setFactShown] = useState(false);
  const [randomOrder, setRandomOrder] = useState<Array<RandomType>>([]);

  useEffect(() => {
    const config = getRandomOfTheDayConfig();

    if (!config) {
      return;
    }

    const { showDescription, sections } = config;

    setDescriptionShown(showDescription);
    setRandomOrder(sections);
    setPoemShown(sections.some((randomType) => randomType === RandomType.POEM));
    setFactShown(sections.some((randomType) => randomType === RandomType.FACT));
  }, []);

  useEffect(() => {
    setRandomOfTheDayConfig({
      showDescription: descriptionShown,
      sections: randomOrder,
    });
  }, [descriptionShown, randomOrder]);

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

  addedRandoms = randomOrder.map((randomType) => {
    return addedRandoms.find((addedRandom) => addedRandom.type === randomType);
  });

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

  const descriptionClassName = classNames(styles.description, {
    [styles.descriptionHidden]: !descriptionShown,
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
      <h1>{randomOfTheDayConfig.textContent.header}</h1>
      <main className={descriptionClassName}>
        {randomOfTheDayConfig.textContent.description.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </main>
      <button
        className={styles.hidePageDescription}
        onClick={() => setDescriptionShown(!descriptionShown)}
      >
        {descriptionShown
          ? randomOfTheDayConfig.textContent.hideDescription
          : randomOfTheDayConfig.textContent.showDescription}
      </button>
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
        setShown = setSection(setPoemShown, RandomType.POEM);
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
        setShown = setSection(setFactShown, RandomType.FACT);
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

  function setSection(
    set: (state: boolean) => void,
    value: RandomType
  ): (state: boolean) => void {
    return (state: boolean) => {
      set(state);
      setRandomOrder(randomOrder ? randomOrder.concat(value) : [value]);
    };
  }
}

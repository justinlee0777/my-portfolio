import styles from './index.module.scss';

import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
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
import {
  AnimatedSlides,
  animateSlides,
} from '../utils/animate-slides.function';
import { SlideAnimation } from '../config/slide-animation.enum';
import RandomPaintingOfTheDay from './sections/random-painting-of-the-day/random-painting-of-the-day';
import { Modal } from '../services/modal';

export interface RandomOfTheDayPageProps {
  modal: Modal;

  animation: SlideAnimation;
  randomOfTheDayConfig: RandomOfTheDayConfig;
  apiUrl: string;
}

interface RandomThingSetting extends RandomThing {
  shown: boolean;
  setShown: (state: boolean) => void;
  element: JSX.Element;
  elementId: string;
}

export default function RandomOfTheDayPage({
  modal,

  animation,
  randomOfTheDayConfig,
  apiUrl,
}: RandomOfTheDayPageProps): JSX.Element {
  const defaultConfig = useMemo(() => {
    const config = getRandomOfTheDayConfig();

    return {
      controlsShown: config?.showControls ?? true,
      sections: config?.sections ?? [],
    };
  }, []);

  const [controlsShown, setControlsShown] = useState(
    defaultConfig.controlsShown
  );
  const [randomOrder, setRandomOrder] = useState<Array<RandomType>>(
    defaultConfig.sections
  );

  const [animatedSlides, setAnimatedSlides] = useState<AnimatedSlides>({});

  useEffect(() => {
    setRandomOfTheDayConfig({
      showControls: controlsShown,
      sections: randomOrder,
    });
  }, [controlsShown, randomOrder]);

  const settings: Array<RandomThingSetting> =
    randomOfTheDayConfig.textContent.randoms.map(createRandomThingSetting);

  let addedRandoms: Array<RandomThingSetting> = settings.filter(
    (setting) => setting.shown
  );

  addedRandoms = randomOrder.map((randomType) => {
    return addedRandoms.find((addedRandom) => addedRandom.type === randomType);
  });

  useEffect(() => {
    return animateSlides(
      animation,
      [
        document.getElementById('toggle-randoms'),
        document.getElementById('ordered-randoms'),
        ...addedRandoms.map((random) =>
          document.getElementById(random.elementId)
        ),
      ] as Array<HTMLElement>,
      { get: animatedSlides, set: setAnimatedSlides }
    );
  }, [addedRandoms, animation, animatedSlides]);

  const addedRandomElements: Array<JSX.Element> = addedRandoms.map(
    (setting) => setting.element
  );

  const controlsClassName = classNames(styles.controls, {
    [styles.controlsHidden]: !controlsShown,
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
      <div className={controlsClassName}>
        <main>
          {randomOfTheDayConfig.textContent.description.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </main>
        <FieldSet
          id="toggle-randoms"
          animated={
            animatedSlides['toggle-randoms'] ? 'activated' : 'unactivated'
          }
          legend="Randoms"
        >
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
        <OrderableList
          id="ordered-randoms"
          className={styles.orderedRandoms}
          animated={
            animatedSlides['ordered-randoms'] ? 'activated' : 'unactivated'
          }
          listElements={addedRandoms.map((random) => ({
            value: random.type,
            element: <span>{random.text}</span>,
          }))}
          onReorder={setRandomOrder as (items: Array<string>) => void}
        ></OrderableList>
      </div>
      <button
        className={styles.hidePageDescription}
        onClick={() => setControlsShown(!controlsShown)}
      >
        {controlsShown
          ? randomOfTheDayConfig.textContent.hideControls
          : randomOfTheDayConfig.textContent.showControls}
      </button>
      {addedRandomElements}
    </div>
  );

  function createRandomThingSetting(
    randomThing: RandomThing
  ): RandomThingSetting {
    let shown: boolean;
    let setShown: (state: boolean) => void;
    let elementId: string;
    let element: JSX.Element;

    switch (randomThing.type) {
      case RandomType.POEM:
        elementId = 'random-poem-of-the-day';
        shown = randomOrder.some((random) => random === RandomType.POEM);
        setShown = toggleSection(RandomType.POEM);
        element = (
          <RandomPoemOfTheDay
            id={elementId}
            key={RandomType.POEM}
            animated={animatedSlides[elementId] ? 'activated' : 'unactivated'}
            header={randomOfTheDayConfig.textContent.poemOfTheDay.header}
            randomOfTheDayApiUrl={apiUrl}
          />
        );
        break;
      case RandomType.FACT:
        elementId = 'random-fact-of-the-day';
        shown = randomOrder.some((random) => random === RandomType.FACT);
        setShown = toggleSection(RandomType.FACT);
        element = (
          <RandomFactOfTheDay
            id={elementId}
            key={RandomType.FACT}
            animated={animatedSlides[elementId] ? 'activated' : 'unactivated'}
            {...randomOfTheDayConfig.textContent.factOfTheDay}
            randomOfTheDayApiUrl={apiUrl}
          />
        );
        break;
      case RandomType.PAINTING:
        elementId = 'random-painting-of-the-day';
        shown = randomOrder.some((random) => random === RandomType.PAINTING);
        setShown = toggleSection(RandomType.PAINTING);
        element = (
          <RandomPaintingOfTheDay
            id={elementId}
            key={RandomType.PAINTING}
            modal={modal}
            animated={animatedSlides[elementId] ? 'activated' : 'unactivated'}
            {...randomOfTheDayConfig.textContent.paintingOfTheDay}
            randomOfTheDayApiUrl={apiUrl}
          />
        );
        break;
    }

    return { ...randomThing, shown, setShown, element, elementId };
  }

  function toggleSection(value: RandomType): (state: boolean) => void {
    return (state: boolean) => {
      setRandomOrder(
        state
          ? randomOrder.concat(value)
          : randomOrder.filter((randomType) => randomType !== value)
      );
    };
  }
}

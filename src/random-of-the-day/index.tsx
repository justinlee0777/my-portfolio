import styles from './index.module.scss';

import Head from 'next/head';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

import { RandomOfTheDayConfig, RandomType } from './random-of-the-day.config';
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
import { Modal } from '../services/modal';
import RandomOfTheDaySection from './sections/random-of-the-day-section';

export interface RandomOfTheDayPageProps {
  modal: Modal;

  animation: SlideAnimation;
  randomOfTheDayConfig: RandomOfTheDayConfig;
  apiUrl: string;
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

  const createSectionId = (random: RandomType) => `${random}-of-the-day`;

  useEffect(() => {
    return animateSlides(
      animation,
      [
        document.getElementById('toggle-randoms'),
        document.getElementById('ordered-randoms'),
        ...randomOrder.map((random) =>
          document.getElementById(createSectionId(random))
        ),
      ] as Array<HTMLElement>,
      { get: animatedSlides, set: setAnimatedSlides }
    );
  }, [randomOrder, animation, animatedSlides]);

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
            {randomOfTheDayConfig.textContent.randoms.map((randomThing) => {
              const checkboxId = `random-of-the-day-${randomThing.type}`;
              const isChecked = randomOrder.some(
                (random) => random === randomThing.type
              );
              const onCheckboxChange = toggleSection(randomThing.type);

              return (
                <div className={styles.randomCheckbox} key={randomThing.type}>
                  <input
                    id={checkboxId}
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onCheckboxChange(!isChecked)}
                  />
                  <label htmlFor={checkboxId}>{randomThing.text}</label>
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
          listElements={randomOrder.map((random) => {
            const text = randomOfTheDayConfig.textContent.randoms.find(
              (randomThing) => randomThing.type === random
            )?.text;

            return {
              value: random,
              element: <span>{text}</span>,
            };
          })}
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
      {randomOrder.map((random) => (
        <RandomOfTheDaySection
          random={random}
          key={random}
          animated={
            animatedSlides[createSectionId(random)]
              ? 'activated'
              : 'unactivated'
          }
          apiUrl={apiUrl}
          modal={modal}
          createId={createSectionId}
          config={randomOfTheDayConfig}
        />
      ))}
    </div>
  );

  function toggleSection(value: RandomType): (state: boolean) => void {
    return (state) => {
      setRandomOrder(
        state === true
          ? randomOrder.concat(value)
          : randomOrder.filter((randomType) => randomType !== value)
      );
    };
  }
}

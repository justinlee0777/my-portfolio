import styles from './random-of-the-day.module.scss';

import classNames from 'classnames';
import Head from 'next/head';
import { useContext, useEffect, useState, type JSX } from 'react';

import FieldSet from '../components/fieldset/fieldset';
import OrderableList from '../components/orderable-list/orderable-list';
import SettingsContext from '../contexts/settings/settings.context';
import {
  AnimatedSlides,
  animateSlides,
} from '../utils/animate-slides.function';
import RandomOfTheDayProps from './models/random-of-the-day-props.interface';
import RandomType from './models/random-type.enum';
import RandomOfTheDaySection from './sections/random-of-the-day-section';
import {
  getRandomOfTheDayConfig,
  setRandomOfTheDayConfig,
} from './utils/random-of-the-day-config.function';

export default function RandomOfTheDayPage({
  modal,

  randomOfTheDayConfig,
  apiUrl,
}: RandomOfTheDayProps): JSX.Element {
  const { animation } = useContext(SettingsContext);

  const [controlsShown, setControlsShown] = useState(true);
  const [randomOrder, setRandomOrder] = useState<Array<RandomType>>([]);

  const [animatedSlides, setAnimatedSlides] = useState<AnimatedSlides>({});

  useEffect(() => {
    const config = getRandomOfTheDayConfig();

    if (config) {
      setControlsShown(config.showControls);
      setRandomOrder(config.sections);
    }
  }, []);

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
        <link rel="preconnect" href={apiUrl} />
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

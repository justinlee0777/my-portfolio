import styles from './index.module.scss';

import BuzzwordBingo from 'buzzword-bingo-generator';
import Head from 'next/head';
import { useContext, useEffect, useRef, useState } from 'react';

import Slide from '../components/slide/slide';
import UnitTestCheck from '../components/unit-test-check/unit-test-check';
import SettingsContext from '../contexts/settings/settings.context';
import {
  AnimatedSlides,
  animateSlides,
} from '../utils/animate-slides.function';
import BuzzwordBingoProps from './models/buzzword-bingo-page-props.model';

export default function BuzzwordBingoPage({
  buzzwordBingoConfig,
}: BuzzwordBingoProps) {
  const { animation } = useContext(SettingsContext);

  const headerRef = useRef<HTMLHeadingElement>(null);
  const explanationRef = useRef<HTMLDivElement>(null);
  const [animatedSlides, setAnimatedSlides] = useState<AnimatedSlides>({});

  useEffect(() => {
    if (headerRef.current && explanationRef.current) {
      return animateSlides(
        animation,
        [headerRef.current, explanationRef.current],
        { get: animatedSlides, set: setAnimatedSlides }
      );
    }
  }, [animation, animatedSlides]);

  return (
    <Slide className={styles.slide}>
      <>
        <Head>
          <title>{buzzwordBingoConfig.seo.title}</title>
          <meta
            name="description"
            content={buzzwordBingoConfig.seo.description}
          />
          <meta property="og:title" content={buzzwordBingoConfig.seo.title} />
          <meta
            property="og:description"
            content={buzzwordBingoConfig.seo.description}
          />
        </Head>
        <UnitTestCheck componentName="BuzzwordBingoPage" />
        <h1
          className={styles.header}
          id="buzzword-bingo-header"
          data-animatable={
            animatedSlides['buzzword-bingo-header']
              ? 'activated'
              : 'unactivated'
          }
          ref={headerRef}
        >
          {buzzwordBingoConfig.textContent.header}
        </h1>
        <main
          className={styles.explanation}
          id="buzzword-bingo-explanation"
          data-animatable={
            animatedSlides['buzzword-bingo-explanation']
              ? 'activated'
              : 'unactivated'
          }
          ref={explanationRef}
        >
          {buzzwordBingoConfig.textContent.explanation.map((line, i) => (
            <p className={styles.explanationLine} key={i}>
              {line}
            </p>
          ))}
        </main>
        <BuzzwordBingo
          defaultFiles={[
            {
              name: 'Baseball',
              path: '/bingosheets/baseball-bingo.txt',
            },
            {
              name: 'Key and Peele',
              path: '/bingosheets/key-peele-bingo.txt',
            },
          ]}
        />
      </>
    </Slide>
  );
}

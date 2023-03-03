import styles from './index.module.scss';

import BuzzwordBingo from 'buzzword-bingo-generator';
import Head from 'next/head';
import { useEffect, useRef } from 'react';

import Slide from '../components/slide/slide';
import { BuzzwordBingoConfig } from './buzzword-bingo.config';
import { SlideAnimation } from '../config/slide-animation.enum';
import { marqueeAnimateSlides } from '../utils/marquee-animate-slides.function';

export interface BuzzwordBingoProps {
  buzzwordBingoConfig: BuzzwordBingoConfig;
  animation: SlideAnimation;
}

export default function BuzzwordBingoPage({
  buzzwordBingoConfig,
  animation,
}: BuzzwordBingoProps) {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const explanationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (animation === SlideAnimation.MARQUEE) {
      return marqueeAnimateSlides([headerRef.current, explanationRef.current]);
    }
  }, [animation]);

  return (
    <Slide className={styles.slide}>
      <>
        <Head>
          <title>Buzzword Bingo Generator</title>
          <meta
            name="description"
            content="Web app to generate buzzword bingo sheets."
          />
          <meta property="og:title" content="Buzzword Bingo Generator" />
          <meta
            property="og:description"
            content="Web app to generate buzzword bingo sheets."
          />
        </Head>
        <h1 className={styles.header} ref={headerRef}>
          {buzzwordBingoConfig.textContent.header}
        </h1>
        <div className={styles.explanation} ref={explanationRef}>
          {buzzwordBingoConfig.textContent.explanation.map((line, i) => (
            <p className={styles.explanationLine} key={i}>
              {line}
            </p>
          ))}
        </div>
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

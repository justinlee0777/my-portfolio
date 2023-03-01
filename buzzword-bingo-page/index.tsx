import styles from './index.module.scss';

import BuzzwordBingo from 'buzzword-bingo-generator';
import Head from 'next/head';

import Slide from '../components/slide/slide';
import { BuzzwordBingoConfig } from './buzzword-bingo.config';

export interface BuzzwordBingoProps {
  buzzwordBingoConfig: BuzzwordBingoConfig;
}

export default function BuzzwordBingoPage({
  buzzwordBingoConfig,
}: BuzzwordBingoProps) {
  return (
    <Slide className={styles.slide}>
      <>
        <Head>
          <title>Buzzword Bingo Generator</title>
          <meta
            name="description"
            content="Web app to generate buzzword bingo sheets."
          />
        </Head>
        <h1 className={styles.header}>
          {buzzwordBingoConfig.textContent.header}
        </h1>
        <div className={styles.explanation}>
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

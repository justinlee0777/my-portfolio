import styles from './index.module.scss';

import BuzzwordBingo from 'buzzword-bingo-generator';
import Head from 'next/head';

import Slide from '../components/slide/slide';

export default function BuzzwordBingoPage() {
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
        <h1>Buzzword bingo</h1>
        <div className={styles.explanation}>
          <p>
            Buzzword bingo is typically reserved for stock phrases said during
            an event, but I personally use it for clichés and themes in general.
          </p>
          <p>
            It's best used for things that you're half-interested in, as you
            have a pretty good idea of what will happen, such as Disney and Fast
            and the Furious movies, and Hell's Kitchen.
          </p>
          <p>Though I use it for things I enjoy as well.</p>
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

import slideStyles from '../slide.module.scss';
import styles from './random-poem-of-the-day.module.scss';

import { useEffect, useState } from 'react';

import Slide from '../../../components/slide/slide';
import { Poem } from '../../poem.interface';
import { getPoem } from '../../random-of-the-day.api';
import LoadingScreen from '../../../components/loading-screen/loading-screen';

interface PoemProps {
  id?: string;
  animated?: 'activated' | 'unactivated';

  header: string;
  randomOfTheDayApiUrl: string;
}

export default function RandomPoemOfTheDay({
  id,
  animated,
  header,
  randomOfTheDayApiUrl,
}: PoemProps): JSX.Element {
  const [poem, setPoem] = useState<Poem | null>(null);

  useEffect(() => {
    getPoem(randomOfTheDayApiUrl).then((poem) => {
      setPoem(poem);
    });
  }, []);

  let content: JSX.Element;

  if (!poem) {
    content = <LoadingScreen />;
  } else {
    content = (
      <section>
        <h3>{poem.title}</h3>
        <p>{poem.author}</p>
        {poem.translator && <p>Translated by {poem.translator}</p>}
        <div className={styles.poemSeparator}></div>
        {poem.lines.map((line, i) => (
          <p className={styles.poemLine} key={i}>
            {line}
          </p>
        ))}
      </section>
    );
  }

  return (
    <Slide id={id} animated={animated} className={slideStyles.slide}>
      <>
        <h2>{header}</h2>
        {content}
      </>
    </Slide>
  );
}

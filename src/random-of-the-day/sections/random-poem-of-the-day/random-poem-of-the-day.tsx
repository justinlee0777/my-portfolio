import slideStyles from '../slide.module.scss';
import styles from './random-poem-of-the-day.module.scss';

import { useEffect, useState } from 'react';

import Slide from '../../../components/slide/slide';
import { Poem } from '../../poem.interface';
import { getPoem } from '../../random-of-the-day.api';
import LoadingScreen from '../../../components/loading-screen/loading-screen';
import ErrorScreen from '../../../components/error-screen/error-screen';
import { Link } from '../../../config/link.model';

interface PoemProps {
  id?: string;
  animated?: 'activated' | 'unactivated';

  header: string;
  randomOfTheDayApiUrl: string;
  linkedErrorMessage: Link;
}

export default function RandomPoemOfTheDay({
  id,
  animated,
  header,
  randomOfTheDayApiUrl,
  linkedErrorMessage,
}: PoemProps): JSX.Element {
  const [error, setError] = useState<string | null>(null);

  const [poem, setPoem] = useState<Poem | null>(null);

  useEffect(() => {
    getPoem(randomOfTheDayApiUrl)
      .then((poem) => {
        setPoem(poem);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  let content: JSX.Element;

  if (error) {
    content = (
      <ErrorScreen linkedMessage={linkedErrorMessage} errorMessages={[error]} />
    );
  } else if (!poem) {
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

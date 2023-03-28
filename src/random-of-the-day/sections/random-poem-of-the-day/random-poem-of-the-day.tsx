import slideStyles from '../slide.module.scss';
import styles from './random-poem-of-the-day.module.scss';

import Slide from '../../../components/slide/slide';
import { Poem } from '../../poem.interface';
import LoadingScreen from '../../../components/loading-screen/loading-screen';
import ErrorScreen from '../../../components/error-screen/error-screen';
import { Link } from '../../../config/link.model';
import UnitTestCheck from '../../../components/unit-test-check/unit-test-check';
import { useApi } from '../../../utils/hooks/use-api.hook';
import { getPoem } from '../../random-of-the-day.api';

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
  const [poem, error] = useApi<Poem>(() => getPoem(randomOfTheDayApiUrl));

  let content: JSX.Element;

  if (error) {
    content = <ErrorScreen errorMessages={[error]} />;
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
        <UnitTestCheck componentName="RandomPoemOfTheDay" />
        <h2>{header}</h2>
        {content}
      </>
    </Slide>
  );
}

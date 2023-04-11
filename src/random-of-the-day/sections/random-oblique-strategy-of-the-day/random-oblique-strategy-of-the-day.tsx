import slideStyles from '../slide.module.scss';
import styles from './random-oblique-strategy-of-the-day.module.scss';

import ErrorScreen from '../../../components/error-screen/error-screen';
import LoadingScreen from '../../../components/loading-screen/loading-screen';
import { useApi } from '../../../utils/hooks/use-api.hook';
import { ObliqueStrategy } from '../../oblique-strategy.interface';
import { getObliqueStrategy } from '../../random-of-the-day.api';
import { BaseSectionProps } from '../base-section.props';
import UnitTestCheck from '../../../components/unit-test-check/unit-test-check';
import Slide from '../../../components/slide/slide';
import { useState } from 'react';
import classNames from 'classnames';
import { Link, createLinkElement } from '../../../config/link.model';

interface ObliqueStrategyProps extends BaseSectionProps {
  randomOfTheDayApiUrl: string;
  explanation: Link;
}

export default function RandomObliqueStrategyOfTheDay({
  id,
  animated,
  header,
  randomOfTheDayApiUrl,
  explanation,
}: ObliqueStrategyProps): JSX.Element {
  const [obliqueStrategy, error] = useApi<ObliqueStrategy>(() =>
    getObliqueStrategy(randomOfTheDayApiUrl)
  );
  const [flipped, setFlipped] = useState(false);

  let content: JSX.Element;

  if (error) {
    content = <ErrorScreen errorMessages={[error]} />;
  } else if (!obliqueStrategy) {
    content = <LoadingScreen />;
  } else {
    const cardClassName = classNames(styles.card, {
      [styles.cardFlipped]: flipped,
    });

    content = (
      <section>
        <p className={cardClassName}>
          {obliqueStrategy.content}
          <button
            className={styles.cardBack}
            aria-label="Clicking on this will activate an animation and expose the oblique strategy of the day."
            aria-hidden={flipped}
            onClick={() => setFlipped(true)}
          ></button>
        </p>
        <p
          dangerouslySetInnerHTML={{ __html: createLinkElement(explanation) }}
        ></p>
      </section>
    );
  }

  return (
    <Slide id={id} animated={animated} className={slideStyles.slide}>
      <>
        <UnitTestCheck componentName="RandomObliqueStrategyOfTheDay" />
        <h2>{header}</h2>
        {content}
      </>
    </Slide>
  );
}

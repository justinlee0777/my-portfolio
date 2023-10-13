import slideStyles from '../slide.module.scss';
import styles from './random-oblique-strategy-of-the-day.module.scss';

import classNames from 'classnames';
import { useState } from 'react';
import ErrorScreen from '../../../components/error-screen/error-screen';
import LoadingScreen from '../../../components/loading-screen/loading-screen';
import Slide from '../../../components/slide/slide';
import UnitTestCheck from '../../../components/unit-test-check/unit-test-check';
import createLinkElement from '../../../config/create-link-element.function';
import LinkedString from '../../../models/linked-string.model';
import { useApi } from '../../../utils/hooks/use-api.hook';
import getObliqueStrategy from '../../api/get-oblique-strategy.function';
import { ObliqueStrategy } from '../../models/oblique-strategy.interface';
import { BaseSectionProps } from '../base-section.props';

interface ObliqueStrategyProps extends BaseSectionProps {
  randomOfTheDayApiUrl: string;
  explanation: LinkedString;
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
          <span className={styles.cardSide} data-theme-background>
            {obliqueStrategy.content}
          </span>
          <button
            className={classNames(styles.cardSide, styles.cardBack)}
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

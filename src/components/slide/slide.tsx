import styles from './slide.module.scss';

import classNames from 'classnames';
import { type JSX } from 'react';

import UnitTestCheck from '../unit-test-check/unit-test-check';
import SlideProps from './slide-props.interface';

export default function Slide({
  className,
  children,
  animated,
  id,
  slideRef,
}: SlideProps): JSX.Element {
  const slideClassName = classNames(styles.slide, className);

  return (
    <article
      className={slideClassName}
      id={id}
      data-animatable={animated}
      ref={slideRef}
    >
      <UnitTestCheck
        componentName="Slide"
        style={{ transform: 'translateX(48vw)' }}
      />
      {children}
    </article>
  );
}

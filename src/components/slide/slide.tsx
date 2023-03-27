import styles from './slide.module.scss';

import classNames from 'classnames';
import { RefObject } from 'react';

import UnitTestCheck from '../unit-test-check/unit-test-check';

export interface SlideProps {
  children: JSX.Element;
  className?: string;
  animated?: 'activated' | 'unactivated';
  id?: string;
  slideRef?: RefObject<HTMLElement>;
}

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

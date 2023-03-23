import styles from './slide.module.scss';

import classNames from 'classnames';

import UnitTestCheck from '../unit-test-check/unit-test-check';

export interface SlideProps {
  children: JSX.Element;
  className?: string;
  animated?: 'activated' | 'unactivated';
  id?: string;
}

export default function Slide({
  className,
  children,
  animated,
  id,
}: SlideProps): JSX.Element {
  const slideClassName = classNames(styles.slide, className);

  return (
    <article className={slideClassName} id={id} data-animatable={animated}>
      <UnitTestCheck
        componentName="Slide"
        style={{ transform: 'translateX(48vw)' }}
      />
      {children}
    </article>
  );
}

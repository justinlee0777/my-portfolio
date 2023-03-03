import styles from './slide.module.scss';

import classNames from 'classnames';

import UnitTestCheck from '../unit-test-check/unit-test-check';

export interface SlideProps {
  children: JSX.Element;
  className?: string;
  id?: string;
}

export default function Slide({
  className,
  children,
  id,
}: SlideProps): JSX.Element {
  const slideClassName = classNames(styles.slide, className);

  return (
    <div className={slideClassName} id={id}>
      <UnitTestCheck
        componentName={Slide.name}
        style={{ transform: 'translateX(48vw)' }}
      />
      {children}
    </div>
  );
}

import classNames from 'classnames';

import styles from './slide.module.scss';

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
      {children}
    </div>
  );
}

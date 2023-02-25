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
  return (
    <div className={`${styles.slide} ${className ?? ''}`} id={id}>
      {children}
    </div>
  );
}

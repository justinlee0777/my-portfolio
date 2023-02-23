import styles from './slide.module.scss';

export default function Slide({ children }): JSX.Element {
  return <div className={styles.slide}>{children}</div>;
}

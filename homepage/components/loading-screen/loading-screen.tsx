import styles from './loading-screen.module.scss';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [loadingTickIndex, setLoadingTickIndex] = useState(0);
  const maxTicks = 3;

  const loadingTicks: Array<JSX.Element> = [];

  for (let i = 0; i < maxTicks; i++) {
    const className =
      styles.loadingTick +
      (loadingTickIndex === i ? ` ${styles.animated}` : '');

    loadingTicks.push(<div className={className} key={i}></div>);
  }

  useEffect(() => {
    const intervalId = setTimeout(() => {
      if (loadingTickIndex >= maxTicks) {
        setLoadingTickIndex(0);
      } else {
        setLoadingTickIndex(loadingTickIndex + 1);
      }
    }, 333);

    return () => clearTimeout(intervalId);
  }, [loadingTickIndex]);

  return (
    <>
      <p>We're preparing your changes...</p>
      <div className={styles.loadingIcon}>{loadingTicks}</div>
    </>
  );
}

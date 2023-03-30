import styles from './loading-screen.module.scss';

import { useEffect, useState } from 'react';
import classNames from 'classnames';

import UnitTestCheck from '../unit-test-check/unit-test-check';

export interface LoadingScreenProps {
  className?: string;
  message?: string;
}

export default function LoadingScreen({
  className,
  message = "We're preparing your changes...",
}: LoadingScreenProps) {
  const [loadingTickIndex, setLoadingTickIndex] = useState(0);
  const maxTicks = 3;

  const loadingTicks: Array<JSX.Element> = [];

  for (let i = 0; i < maxTicks; i++) {
    const className = classNames(styles.loadingTick, {
      [styles.animated]: loadingTickIndex === i,
    });

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
    <div className={className}>
      <UnitTestCheck componentName="LoadingScreen" />
      <p>{message}</p>
      <div className={styles.loadingIcon}>{loadingTicks}</div>
    </div>
  );
}

import styles from './index.module.scss';

import Link from 'next/link';

import UnitTestCheck from '../../../components/unit-test-check/unit-test-check';
import { MusingConfig } from '../musing/musing.config';

export interface MusingsProps {
  musings: Array<MusingConfig>;
}

export default function Musings({ musings }: MusingsProps): JSX.Element {
  return (
    <>
      <UnitTestCheck componentName="Musings" />
      <ul className={styles.musings}>
        {musings.map((musing) => (
          <li key={musing.slug} className={styles.listMusing}>
            <Link
              className={styles.musingLink}
              href={`/musings/${musing.slug}`}
            >
              <h4 className={styles.musingTitle}>{musing.display.title}</h4>
            </Link>
            <span>{musing.display.timestamp}</span>
            <span className={styles.musingDescription}>
              {musing.display.description}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

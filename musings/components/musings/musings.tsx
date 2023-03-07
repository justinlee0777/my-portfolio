import styles from './index.module.scss';

import Link from 'next/link';

import { MusingConfig } from '../musing/musing.config';

export interface MusingsProps {
  musings: Array<MusingConfig>;
}

export default function Musings({ musings }: MusingsProps): JSX.Element {
  return (
    <ul className={styles.musings}>
      {musings.map((musing) => (
        <li key={musing.slug} className={styles.listMusing}>
          <Link className={styles.musingLink} href={`/musings/${musing.slug}`}>
            <h4 className={styles.musingTitle}>{musing.display.title}</h4>
          </Link>
          <span>{musing.display.timestamp}</span>
          <span className={styles.musingDescription}>
            {musing.display.description}
          </span>
        </li>
      ))}
    </ul>
  );
}

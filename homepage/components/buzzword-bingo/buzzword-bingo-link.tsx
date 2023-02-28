import styles from './buzzword-bingo-link.module.scss';

import Link from 'next/link';

export function BuzzwordBingoLink(): JSX.Element {
  return (
    <>
      <Link href="/buzzword-bingo">Buzzword Bingo Generator</Link>
      <p className={styles.description}>
        A little program to generate bingo sheets for various events. Click the
        link above.
      </p>
    </>
  );
}

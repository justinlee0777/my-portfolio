import styles from './index.module.scss';

import dynamic from 'next/dynamic';
import { JSX, useEffect } from 'react';
import { getBasePageProps } from '../../src/page-utils/get-base-page-props.function';

const AuthorMap = dynamic(
  () => import('author-map-ui').then(({ AuthorMap }) => AuthorMap),
  {
    ssr: false,
  }
);

export default function AuthorMapPage(): JSX.Element {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  return <AuthorMap className={styles.authorMap} authors={[]} />;
}

export async function getStaticProps() {
  const baseProps = await getBasePageProps('en');

  return {
    props: {
      ...baseProps,
    },
  };
}

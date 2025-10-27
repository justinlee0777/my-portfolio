import './index.globals.scss';
import styles from './index.module.scss';

import { Author } from 'author-map-ui';
import dynamic from 'next/dynamic';
import { JSX, useEffect, useState } from 'react';
import LoadingScreen from '../../src/components/loading-screen/loading-screen';
import { getBasePageProps } from '../../src/page-utils/get-base-page-props.function';

const AuthorMap = dynamic(
  () => import('author-map-ui').then(({ AuthorMap }) => AuthorMap),
  {
    ssr: false,
  }
);

export default function AuthorMapPage(): JSX.Element {
  const [loadedAuthors, setLoadedAuthors] = useState<Array<Author> | null>();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  useEffect(() => {
    if (!loadedAuthors) {
      (async () => {
        const response = await fetch('/api/authors');

        const authors = await response.json();

        setLoadedAuthors(authors);
      })();
    }
  }, [loadedAuthors, setLoadedAuthors]);

  if (!loadedAuthors) {
    return <LoadingScreen className={styles.loadingScreen} />;
  } else {
    return (
      <AuthorMap
        className={styles.authorMap}
        authors={loadedAuthors}
        syncAuthorAdded={async (author) => {
          const response = await fetch('/api/authors', {
            method: 'POST',
            body: JSON.stringify(author),
          });

          if (!response.ok) {
            throw new Error(await response.text());
          } else {
            author.id = (await response.json()).id;
          }
        }}
        syncAuthorUpdate={async (author) => {
          const response = await fetch(`/api/authors/${author.id}`, {
            method: 'POST',
            body: JSON.stringify(author),
          });

          if (!response.ok) {
            throw new Error(await response.text());
          }
        }}
      />
    );
  }
}

export async function getStaticProps() {
  const baseProps = await getBasePageProps('en');

  return {
    props: {
      ...baseProps,
    },
  };
}

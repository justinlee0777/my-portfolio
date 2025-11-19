import './index.globals.scss';
import styles from './index.module.scss';

import type { Author, AuthorGroup } from 'author-map-ui';
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
  const [loadedAuthors, setLoadedAuthors] = useState<Array<Author> | null>(),
    [loadedGroups, setLoadedGroups] = useState<Array<AuthorGroup> | null>();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  useEffect(() => {
    if (!loadedAuthors) {
      (async () => {
        const [authorResponse, authorGroupResponse] = await Promise.all([
          fetch('/api/authors'),
          fetch('/api/author-groups'),
        ]);

        const authors = await authorResponse.json(),
          authorGroups = await authorGroupResponse.json();

        setLoadedAuthors(authors);
        setLoadedGroups(authorGroups);
      })();
    }
  }, [loadedAuthors, setLoadedAuthors]);

  if (!(loadedAuthors && loadedGroups)) {
    return <LoadingScreen className={styles.loadingScreen} />;
  } else {
    return (
      <AuthorMap
        className={styles.authorMap}
        authors={loadedAuthors}
        groups={loadedGroups}
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
        onGroupCreated={async (group) => {
          const response = await fetch('/api/author-groups', {
            method: 'POST',
            body: JSON.stringify(group),
          });

          if (!response.ok) {
            throw new Error(await response.text());
          } else {
            group.id = (await response.json()).id;

            setLoadedGroups((currentGroups) => currentGroups!.concat(group));
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

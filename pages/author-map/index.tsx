import './index.globals.scss';
import styles from './index.module.scss';

import { MajorEvent, type Author, type AuthorGroup } from 'author-map-ui';
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
    [loadedGroups, setLoadedGroups] = useState<Array<AuthorGroup> | null>(),
    [loadedMajorEvents, setLoadedMajorEvents] =
      useState<Array<MajorEvent> | null>();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  useEffect(() => {
    if (!loadedAuthors) {
      (async () => {
        const [authors, authorGroups, majorEvents] = await Promise.all([
          fetch('/api/authors').then((response) => response.json()),
          fetch('/api/author-groups').then((response) => response.json()),
          fetch('/api/author-major-events').then((response) => response.json()),
        ]);

        setLoadedAuthors(authors);
        setLoadedGroups(authorGroups);
        setLoadedMajorEvents(majorEvents);
      })();
    }
  }, [
    loadedAuthors,
    setLoadedAuthors,
    loadedGroups,
    setLoadedGroups,
    loadedMajorEvents,
    setLoadedMajorEvents,
  ]);

  if (!(loadedAuthors && loadedGroups && loadedMajorEvents)) {
    return <LoadingScreen className={styles.loadingScreen} />;
  } else {
    return (
      <AuthorMap
        className={styles.authorMap}
        authors={loadedAuthors}
        groups={loadedGroups}
        majorEvents={loadedMajorEvents}
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
        onGroupUpdated={async (group) => {
          const response = await fetch(`/api/author-groups/${group.id}`, {
            method: 'POST',
            body: JSON.stringify(group),
          });

          if (!response.ok) {
            throw new Error(await response.text());
          }
        }}
        onMajorEventCreated={async (event) => {
          const response = await fetch('/api/author-major-events', {
            method: 'POST',
            body: JSON.stringify(event),
          });

          if (!response.ok) {
            throw new Error(await response.text());
          } else {
            event.id = (await response.json()).id;

            setLoadedMajorEvents((currentEvents) =>
              currentEvents!.concat(event)
            );
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

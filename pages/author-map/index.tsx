import './index.globals.scss';
import styles from './index.module.scss';

import { MajorEvent, type Author, type AuthorGroup } from 'author-map-ui';
import dynamic from 'next/dynamic';
import { JSX, useEffect, useState } from 'react';
import LoadingScreen from '../../src/components/loading-screen/loading-screen';
import { getBasePageProps } from '../../src/page-utils/get-base-page-props.function';
import { Modal } from '../../src/services/modal';

const AuthorMap = dynamic(
  () => import('author-map-ui').then(({ AuthorMap }) => AuthorMap),
  {
    ssr: false,
  }
);

export default function AuthorMapPage({
  modal,
}: {
  modal: Modal;
}): JSX.Element {
  const [loadedAuthors, setLoadedAuthors] = useState<Array<Author> | null>(),
    [loadedGroups, setLoadedGroups] = useState<Array<AuthorGroup> | null>(),
    [loadedMajorEvents, setLoadedMajorEvents] =
      useState<Array<MajorEvent> | null>();

  const [userSignedIn, setUserSignedIn] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  useEffect(() => {
    async function readAuthToken() {
      const authToken = await cookieStore.get('auth');

      if (authToken) {
        setUserSignedIn(true);
      }
    }

    readAuthToken();
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
      <>
        <AuthorMap
          className={styles.authorMap}
          authors={loadedAuthors}
          groups={loadedGroups}
          majorEvents={loadedMajorEvents}
          disabled={!userSignedIn && 'You are not permitted to edit the map.'}
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
        <button
          className={styles.signIn}
          onClick={() => {
            modal.set(
              <dialog
                className={styles.signInModal}
                onClick={() => modal.close()}
              >
                <div
                  className={styles.signInModalContainer}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                >
                  <form
                    onSubmit={async (event) => {
                      event.preventDefault();

                      const formData = new FormData(
                        event.target as HTMLFormElement
                      );

                      const authToken = `${formData.get(
                        'username'
                      )}:${formData.get('password')}`;

                      const encodedToken = btoa(authToken);

                      const response = await fetch('/api/authors/check-login', {
                        headers: {
                          Authorization: encodedToken,
                        },
                      });

                      if (response.status === 200) {
                        setUserSignedIn(true);
                        modal.close();
                      }
                    }}
                  >
                    <label htmlFor="authorUsername">Username</label>
                    <input
                      id="authorUsername"
                      name="username"
                      type="text"
                      required
                      autoComplete="username"
                    />

                    <label htmlFor="authorPassword">Password</label>
                    <input
                      id="authorPassword"
                      name="password"
                      type="password"
                      required
                      autoComplete="current-password"
                    />

                    <button
                      type="submit"
                      onClick={(event) => event.stopPropagation()}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </dialog>
            );
          }}
        >
          {userSignedIn ? `You're signed in.` : 'Sign in'}
        </button>
      </>
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

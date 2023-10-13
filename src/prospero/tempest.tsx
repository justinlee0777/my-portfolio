import styles from './index.module.scss';

import { BookConfig } from 'prospero/types';
import { BookComponent } from 'prospero/web/book';
import {
  DoublePageBookAnimation,
  SinglePageBookAnimation,
} from 'prospero/web/book/animations';
import {
  listenToClickEvents,
  listenToKeyboardEvents,
} from 'prospero/web/book/listeners';
import { DefaultBookTheme } from 'prospero/web/book/theming';
import { BooksComponent } from 'prospero/web/books';
import { useMemo } from 'react';

import { TempestPageProps } from '../page-utils/prospero/get-tempest-props.function';
import ProsperoPage from './base-page';

export default function TempestPage({
  config,
  pages,
}: TempestPageProps): JSX.Element {
  function getBookConfig(bookmarkKey: string): BookConfig {
    return {
      showBookmark: {
        storage: {
          get: () => JSON.parse(localStorage.getItem(bookmarkKey)),
          save: (bookmarkData) =>
            localStorage.setItem(bookmarkKey, JSON.stringify(bookmarkData)),
        },
      },
      showPagePicker: true,
      theme: DefaultBookTheme,
    };
  }

  const createBooks = useMemo(
    () => () =>
      BooksComponent({
        children: [
          BookComponent(
            pages,
            {
              ...getBookConfig('tempest-mobile-bookmark'),
              pagesShown: 1,
              listeners: [listenToClickEvents],
              animation: new SinglePageBookAnimation(),
            },
            { classnames: [styles.book] }
          ),
          BookComponent(
            pages,
            {
              ...getBookConfig('tempest-desktop-bookmark'),
              media: { minWidth: 1125 },
              pagesShown: 2,
              listeners: [listenToClickEvents, listenToKeyboardEvents],
              animation: new DoublePageBookAnimation(),
            },
            { classnames: [styles.book] }
          ),
        ],
      }),
    []
  );

  return (
    <ProsperoPage
      config={config}
      createBooks={createBooks}
      bookTitle="The Tempest"
      bookAuthor="William Shakespeare"
    ></ProsperoPage>
  );
}

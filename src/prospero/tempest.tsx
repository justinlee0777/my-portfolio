import styles from './index.module.scss';

import { BooksComponent } from 'prospero/web/books';
import { BookComponent } from 'prospero/web/book';
import { DefaultBookTheme } from 'prospero/web/book/theming';
import {
  listenToClickEvents,
  listenToKeyboardEvents,
} from 'prospero/web/book/listeners';
import {
  DoublePageBookAnimation,
  SinglePageBookAnimation,
} from 'prospero/web/book/animations';
import { BookConfig } from 'prospero/types';

import ProsperoPage from './base-page';
import { TempestPageProps } from '../page-utils/prospero/get-tempest-props.function';

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

  const books = BooksComponent({
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
  });

  return (
    <ProsperoPage
      config={config}
      books={books}
      bookTitle="The Tempest"
      bookAuthor="William Shakespeare"
    ></ProsperoPage>
  );
}
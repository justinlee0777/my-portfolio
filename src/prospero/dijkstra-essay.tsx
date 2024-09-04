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
import { DijkstraEssayPageProps } from '../page-utils/prospero/get-dijkstra-essay-props.function';
import ProsperoPage from './base-page';

export default function DijkstraEssayPage({
  config,
  galaxyFold,
  iphoneXR,
}: DijkstraEssayPageProps): JSX.Element {
  function getBookConfig(bookmarkKey: string): BookConfig {
    return {
      showBookmark: {
        storage: {
          get: () => JSON.parse(localStorage.getItem(bookmarkKey)!),
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
            galaxyFold,
            {
              ...getBookConfig('dijkstra-galaxy-fold-bookmark'),
              pagesShown: 1,
              listeners: [listenToClickEvents],
              animation: new SinglePageBookAnimation(),
            },
            { classnames: [styles.book] }
          ),
          BookComponent(
            iphoneXR,
            {
              media: { minWidth: 414 },
              ...getBookConfig('dijkstra-iphone-bookmark'),
              pagesShown: 1,
              listeners: [listenToClickEvents],
              animation: new SinglePageBookAnimation(),
            },
            { classnames: [styles.book] }
          ),
          BookComponent(
            iphoneXR,
            {
              media: { minWidth: 818 },
              ...getBookConfig('dijkstra-iphone-bookmark'),
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
      bookTitle="On the cruelty of really teaching computing science"
      bookAuthor="Edsger W. Dijkstra"
    ></ProsperoPage>
  );
}

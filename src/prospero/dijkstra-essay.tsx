import styles from './index.module.scss';

import BooksComponent from 'prospero/web/books';
import BookComponent from 'prospero/web/book';
import { DefaultBookTheme } from 'prospero/web/theming';
import {
  listenToClickEvents,
  listenToKeyboardEvents,
} from 'prospero/web/listeners';
import {
  DoublePageBookAnimation,
  SinglePageBookAnimation,
} from 'prospero/web/animations';
import { BookConfig } from 'prospero/types';

import ProsperoPage from './base-page';
import { DijkstraEssayPageProps } from '../page-utils/prospero/get-dijkstra-essay-props.function';

export default function DijkstraEssayPage({
  config,
  galaxyFold,
  iphoneXR,
}: DijkstraEssayPageProps): JSX.Element {
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
  });

  return (
    <ProsperoPage
      config={config}
      books={books}
      bookTitle="On the cruelty of really teaching computing science"
      bookAuthor="Edsger W. Dijkstra"
    ></ProsperoPage>
  );
}

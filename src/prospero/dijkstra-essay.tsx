import styles from './index.module.scss';

import {
  BooksComponent,
  BookComponent,
  SinglePageBookPreset,
  DoublePageBookPreset,
  DefaultBookTheme,
} from 'prospero/web';
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
          ...SinglePageBookPreset(),
          ...getBookConfig('dijkstra-galaxy-fold-bookmark'),
        },
        { classnames: [styles.book] }
      ),
      BookComponent(
        iphoneXR,
        {
          ...SinglePageBookPreset(),
          media: { minWidth: 414 },
          ...getBookConfig('dijkstra-iphone-bookmark'),
        },
        { classnames: [styles.book] }
      ),
      BookComponent(
        iphoneXR,
        {
          ...DoublePageBookPreset(),
          media: { minWidth: 818 },
          ...getBookConfig('dijkstra-iphone-bookmark'),
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

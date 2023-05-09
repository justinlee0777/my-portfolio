import styles from './index.module.scss';

import {
  BooksComponent,
  BookComponent,
  listenToClickEvents,
  listenToKeyboardEvents,
} from 'prospero/web';

import ProsperoPage from './base-page';
import { DijkstraEssayPageProps } from '../page-utils/prospero/get-dijkstra-essay-props.function';

export default function DijkstraEssayPage({
  config,
  galaxyFold,
  iphoneXR,
}: DijkstraEssayPageProps): JSX.Element {
  const books = BooksComponent({
    children: [
      BookComponent(
        galaxyFold,
        {
          pagesShown: 1,
          listeners: [listenToClickEvents],
        },
        { classnames: [styles.book] }
      ),
      BookComponent(
        iphoneXR,
        {
          pagesShown: 1,
          listeners: [listenToClickEvents],
          media: { minWidth: 414 },
        },
        { classnames: [styles.book] }
      ),
      BookComponent(
        iphoneXR,
        {
          pagesShown: 2,
          listeners: [listenToClickEvents, listenToKeyboardEvents],
          media: { minWidth: 818 },
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

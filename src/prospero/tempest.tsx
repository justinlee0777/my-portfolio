import styles from './index.module.scss';

import {
  BooksComponent,
  BookComponent,
  listenToClickEvents,
  listenToKeyboardEvents,
} from 'prospero/web';

import ProsperoPage from './base-page';
import { TempestPageProps } from '../page-utils/prospero/get-tempest-props.function';

export default function TempestPage({
  config,
  pages,
}: TempestPageProps): JSX.Element {
  const books = BooksComponent({
    children: [
      BookComponent(
        pages,
        {
          pagesShown: 1,
          listeners: [listenToClickEvents],
        },
        { classnames: [styles.book] }
      ),
      BookComponent(
        pages,
        {
          pagesShown: 2,
          listeners: [listenToClickEvents, listenToKeyboardEvents],
          media: { minWidth: 1125 },
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

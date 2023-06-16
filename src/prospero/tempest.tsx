import styles from './index.module.scss';

import {
  BooksComponent,
  BookComponent,
  DefaultBookTheme,
  SinglePageBookPreset,
  DoublePageBookPreset,
} from 'prospero/web';
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
          ...SinglePageBookPreset(),
          ...getBookConfig('tempest-mobile-bookmark'),
        },
        { classnames: [styles.book] }
      ),
      BookComponent(
        pages,
        {
          ...DoublePageBookPreset(),
          ...getBookConfig('tempest-desktop-bookmark'),
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

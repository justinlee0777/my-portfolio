import styles from './index.module.scss';

import { BookConfig, BooksElement } from 'prospero/types';
import { LoadingScreenComponent } from 'prospero/web';
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
import ServerPages from 'prospero/web/server-pages';
import { useMemo, type JSX } from 'react';

import { desktopStyles, mobileStyles } from '../consts/ulysses-styles.const';
import { ProsperoPageProps } from '../page-utils/prospero/get-base-props.function';
import ProsperoPage from './base-page';

export default function AChristmasCarolPage({
  config,
}: ProsperoPageProps): JSX.Element {
  const endpointBase = '/api/prospero/texts';

  const mobilePages = useMemo(
    () => new ServerPages(`${endpointBase}/a-christmas-carol/mobile`),
    []
  );

  const desktopPages = useMemo(
    () => new ServerPages(`${endpointBase}/a-christmas-carol/desktop`),
    []
  );

  const createBooks = useMemo(
    () => () => {
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
          loading: LoadingScreenComponent,
        };
      }

      const desktopBook = BookComponent(
        {
          getPage: (pageNumber) => desktopPages.get(pageNumber),
          pageStyles: desktopStyles,
        },
        {
          animation: new DoublePageBookAnimation(),
          listeners: [listenToClickEvents, listenToKeyboardEvents],
          pagesShown: 2,
          media: {
            minWidth: 750,
          },
          tableOfContents: fetch(
            `${endpointBase}/a-christmas-carol/table-of-contents/desktop`
          ).then((response) => response.json()),
          ...getBookConfig('desktop-a-christmas-carol-bookmark'),
        },
        { classnames: [styles.book] }
      );

      const mobileBook = BookComponent(
        {
          getPage: (pageNumber) => mobilePages.get(pageNumber),
          pageStyles: mobileStyles,
        },
        {
          animation: new SinglePageBookAnimation(),
          listeners: [listenToClickEvents],
          pagesShown: 1,
          tableOfContents: fetch(
            `${endpointBase}/a-christmas-carol/table-of-contents/mobile`
          ).then((response) => response.json()),
          ...getBookConfig('mobile-a-christmas-carol-bookmark'),
        },
        { classnames: [styles.book] }
      );

      return BooksComponent({
        children: [mobileBook, desktopBook],
      });
    },
    [mobileStyles, desktopStyles]
  );

  return (
    <ProsperoPage
      config={config}
      createBooks={createBooks as () => BooksElement}
      bookTitle="A Christmas Carol"
      bookAuthor="Charles Dickens"
    ></ProsperoPage>
  );
}

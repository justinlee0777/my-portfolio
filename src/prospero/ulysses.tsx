import styles from './index.module.scss';

import { BookConfig, BooksElement, PageStyles } from 'prospero/types';
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
import { useEffect, useMemo, useState } from 'react';

import { ProsperoPageProps } from '../page-utils/prospero/get-base-props.function';
import ProsperoPage from './base-page';

export default function UlyssesPage({
  config,
}: ProsperoPageProps): JSX.Element {
  const endpointBase = '/api/prospero/texts';

  const [mobileStyles, setMobileStyles] = useState<PageStyles | null>(null);

  const [desktopStyles, setDesktopStyles] = useState<PageStyles | null>(null);

  const mobilePages = useMemo(
    () => new ServerPages(`${endpointBase}/ulysses/mobile`),
    []
  );

  const desktopPages = useMemo(
    () => new ServerPages(`${endpointBase}/ulysses/desktop`),
    []
  );

  const createBooks = useMemo(
    () => () => {
      if (!(mobileStyles && desktopStyles)) {
        return null;
      }

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
          ...getBookConfig('desktop-ulysses-bookmark'),
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
          ...getBookConfig('mobile-ulysses-bookmark'),
        },
        { classnames: [styles.book] }
      );

      return BooksComponent({
        children: [mobileBook, desktopBook],
      });
    },
    [mobileStyles, desktopStyles]
  );

  useEffect(() => {
    Promise.all([
      mobilePages.getPageStyles(),
      desktopPages.getPageStyles(),
    ]).then(([mobilePageStyles, desktopPageStyles]) => {
      setMobileStyles(mobilePageStyles);

      setDesktopStyles(desktopPageStyles);
    });
  }, []);

  return (
    <ProsperoPage
      config={config}
      createBooks={createBooks as () => BooksElement}
      bookTitle="Ulysses"
      bookAuthor="James Joyce"
    ></ProsperoPage>
  );
}

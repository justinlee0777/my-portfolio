import { BookConfig } from 'prospero/types';
import {
  DoublePageBookAnimation,
  SinglePageBookAnimation,
} from 'prospero/web/book/animations';
import {
  listenToClickEvents,
  listenToKeyboardEvents,
} from 'prospero/web/book/listeners';
import { DefaultBookTheme } from 'prospero/web/book/theming';
import { FlexibleBookComponent } from 'prospero/web/flexible-book';
import { useEffect, useMemo, useState } from 'react';

import { TempestPageProps } from '../page-utils/prospero/get-tempest-props.function';
import ProsperoPage from './base-page';

export default function TempestPage({ config }: TempestPageProps): JSX.Element {
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    async function loadText() {
      if (!text) {
        const response = await fetch('/prospero/tempest.txt');

        const text = await response.text();

        setText(text);
      }
    }

    loadText();
  }, [text, setText]);

  const getBookConfig = useMemo(
    () =>
      (bookmarkKey: string): BookConfig => {
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
      },
    []
  );

  const createBooks = useMemo(() => {
    if (text) {
      return () =>
        FlexibleBookComponent(
          {
            text,
            pageStyles: {
              computedFontFamily: 'Bookerly',
              computedFontSize: '14px',
              lineHeight: 28,
              padding: {
                top: 36,
                right: 18,
                bottom: 36,
                left: 18,
              },
            },
            mediaQueryList: [
              {
                ...getBookConfig('tempest-mobile-key'),
                pagesShown: 1,
                listeners: [listenToClickEvents],
                animation: new SinglePageBookAnimation(),
              },
              {
                pattern: {
                  minWidth: 800,
                },
                config: {
                  ...getBookConfig('tempest-desktop-key'),
                  pagesShown: 2,
                  listeners: [listenToClickEvents, listenToKeyboardEvents],
                  theme: DefaultBookTheme,
                  animation: new DoublePageBookAnimation(),
                },
              },
            ],
          },
          undefined,
          {
            styles: {
              width: '80vw',
              height: '80vh',
              maxWidth: '1200px',
              margin: 'auto',
            },
          }
        );
    }
  }, [getBookConfig, text]);

  return (
    <ProsperoPage
      config={config}
      createBooks={createBooks}
      bookTitle="The Tempest"
      bookAuthor="William Shakespeare"
    ></ProsperoPage>
  );
}

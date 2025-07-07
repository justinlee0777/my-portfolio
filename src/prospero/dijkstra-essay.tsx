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
import { IndentTransformer } from 'prospero/web/transformers';

import { useEffect, useMemo, useState, type JSX } from 'react';
import { DijkstraEssayPageProps } from '../page-utils/prospero/get-dijkstra-essay-props.function';
import ProsperoPage from './base-page';

export default function DijkstraEssayPage({
  config,
}: DijkstraEssayPageProps): JSX.Element {
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    async function loadText() {
      if (!text) {
        const response = await fetch(
          '/prospero/on-the-cruelty-of-really-teaching-computing-science.txt'
        );

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
                ...getBookConfig('dijkstra-mobile-key'),
                pagesShown: 1,
                listeners: [listenToClickEvents],
                animation: new SinglePageBookAnimation(),
              },
              {
                pattern: {
                  minWidth: 800,
                },
                config: {
                  ...getBookConfig('dijkstra-desktop-key'),
                  pagesShown: 2,
                  listeners: [listenToClickEvents, listenToKeyboardEvents],
                  theme: DefaultBookTheme,
                  animation: new DoublePageBookAnimation(),
                },
              },
            ],
          },
          { transformers: [new IndentTransformer(4)] },
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
      bookTitle="On the cruelty of really teaching computing science"
      bookAuthor="Edsger W. Dijkstra"
    ></ProsperoPage>
  );
}

import styles from './index.module.scss';

import Head from 'next/head';
import { BooksElement } from 'prospero/types';
import { useEffect, useRef } from 'react';

import ProsperoConfig from './prospero.config';
import Slide from '../components/slide/slide';
import { createLinkElement } from '../config/link.model';
import { loadFont } from '../config/load-font.function';
import { Font } from '../config/font.enum';

export interface BaseProsperoProps {
  config: ProsperoConfig;
  books: BooksElement;
  bookTitle: string;
  bookAuthor: string;
}

export default function ProsperoPage({
  config,
  books,
  bookTitle,
  bookAuthor,
}: BaseProsperoProps): JSX.Element {
  const containerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    (async function () {
      await loadFont(Font.BOOKERLY);

      containerRef.current?.appendChild(books);
    })();
  }, [containerRef]);

  return (
    <>
      <Head>
        <title>{config.seo.title}</title>
        <meta name="description" content={config.seo.description} />
        <meta property="og:title" content={config.seo.title} />
        <meta property="og:description" content={config.seo.description} />
      </Head>
      <Slide className={styles.prosperoPage}>
        <>
          <h1 className={styles.prosperoHeader}>{config.textContent.header}</h1>
          <main ref={containerRef}>
            <div className={styles.description}>
              {config.textContent.description.map((line, i) => {
                if (typeof line === 'object') {
                  return (
                    <p
                      key={i}
                      dangerouslySetInnerHTML={{
                        __html: createLinkElement(line),
                      }}
                    />
                  );
                } else {
                  return <p key={i}>{line}</p>;
                }
              })}
            </div>
            <h2>{bookTitle}</h2>
            <h3>{bookAuthor}</h3>
          </main>
          <h4>Other readings</h4>
          <ul>
            {config.links.map(({ text, url }) => (
              <li key={url}>
                <a href={url}>{text}</a>
              </li>
            ))}
          </ul>
        </>
      </Slide>
    </>
  );
}

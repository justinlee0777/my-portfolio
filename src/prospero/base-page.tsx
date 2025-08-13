import styles from './index.module.scss';

import Head from 'next/head';
import { BooksElement } from 'prospero/types';
import { useEffect, useRef, type JSX } from 'react';

import { Bookshelf } from '../components/bookshelf/bookshelf';
import Slide from '../components/slide/slide';
import createLinkElement from '../config/create-link-element.function';
import loadFont from '../config/load-font.function';
import Font from '../models/font.enum';
import ProsperoConfig from './prospero.config';

export interface BaseProsperoProps {
  config: ProsperoConfig;
  createBooks: (() => BooksElement) | undefined;
  bookTitle: string;
  bookAuthor: string;
}

export default function ProsperoPage({
  config,
  createBooks,
  bookTitle,
  bookAuthor,
}: BaseProsperoProps): JSX.Element {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    loadFont(Font.BOOKERLY);
  }, []);

  useEffect(() => {
    if (createBooks) {
      const books = createBooks();

      if (containerRef.current && books) {
        containerRef.current.appendChild(books);
        return () => books.prospero.destroy();
      }
    }
  }, [containerRef, createBooks]);

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
          <Bookshelf
            className={styles.bookshelf}
            books={config.links.map((link) => {
              return {
                author: link.author,
                title: link.text,
                url: link.url,
              };
            })}
          />
          <h1 className={styles.prosperoHeader}>{config.textContent.header}</h1>
          <h2 className={styles.bookTitle}>{bookTitle}</h2>
          <h3 className={styles.bookAuthor}>{bookAuthor}</h3>
          <main ref={containerRef}></main>
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
          <div className={styles.otherReadings}>
            <h4>Other readings</h4>
            <ul className={styles.otherReadingsList}>
              {config.links.map(({ text, url }) => (
                <li key={url}>
                  <a href={url}>{text}</a>
                </li>
              ))}
            </ul>
          </div>
        </>
      </Slide>
    </>
  );
}

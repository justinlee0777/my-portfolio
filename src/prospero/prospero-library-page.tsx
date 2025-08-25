import styles from './index.module.scss';

import Head from 'next/head';
import { JSX } from 'react';

import { Bookshelf } from '../components/bookshelf/bookshelf';
import Slide from '../components/slide/slide';
import createLinkElement from '../config/create-link-element.function';
import { ProsperoLibraryProps } from './base-prospero-props.model';

export function ProsperoLibraryPage({
  config,
  books,
}: ProsperoLibraryProps): JSX.Element {
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
          <Bookshelf className={styles.bookshelf} books={books} />
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
        </>
      </Slide>
    </>
  );
}

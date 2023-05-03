import styles from './index.module.scss';

import Head from 'next/head';
import { BooksComponent, BookComponent } from 'prospero/web';
import { PagesOutput } from 'prospero/types';
import { useEffect, useRef } from 'react';

import ProsperoConfig from './prospero.config';
import Slide from '../components/slide/slide';

export interface ProsperoProps {
  config: ProsperoConfig;
  pages: PagesOutput;
}

export default function ProsperoPage({
  config,
  pages,
}: ProsperoProps): JSX.Element {
  const containerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    containerRef.current?.appendChild(
      BooksComponent({
        children: [
          BookComponent(
            pages,
            { pagesShown: 1 },
            { classnames: [styles.book] }
          ),
          BookComponent(
            pages,
            { pagesShown: 2, media: { minWidth: 1125 } },
            { classnames: [styles.book] }
          ),
        ],
      })
    );
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
          <h1 className={styles.musingsHeader}>{config.textContent.header}</h1>
          <main ref={containerRef}>
            <p>{config.textContent.description}</p>
          </main>
        </>
      </Slide>
    </>
  );
}

import styles from './index.module.scss';

import Head from 'next/head';
import { type JSX } from 'react';

import Slide from '../components/slide/slide';
import Musings from './components/musings/musings';
import MusingsProps from './models/musings-props.interface';

export default function MusingsPage({
  config,
  musings,
}: MusingsProps): JSX.Element {
  return (
    <>
      <Head>
        <title>{config.seo.title}</title>
        <meta name="description" content={config.seo.description} />
        <meta property="og:title" content={config.seo.title} />
        <meta property="og:description" content={config.seo.description} />
      </Head>
      <Slide className={styles.musingsPage}>
        <>
          <h1 className={styles.musingsHeader}>{config.textContent.header}</h1>
          <main>
            {config.textContent.content.map((paragraph, i) => (
              <p key={i} className={styles.musingsParagraph}>
                {paragraph}
              </p>
            ))}
          </main>
          <Musings musings={musings} />
        </>
      </Slide>
    </>
  );
}

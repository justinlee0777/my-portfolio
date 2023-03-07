import styles from './index.module.scss';

import Head from 'next/head';

import Slide from '../components/slide/slide';
import { MusingsConfig } from './musings.config';

export interface MusingsPageProps {
  config: MusingsConfig;

  children?: JSX.Element;
}

/**
 * A wrapper around Markdown.
 */
export default function MusingsPage({ config, children }): JSX.Element {
  return (
    <>
      <Head>
        <title>{config.seo.title}</title>
        <meta name="description" content={config.seo.description} />
        <meta property="og:title" content={config.seo.title} />
        <meta property="og:description" content={config.seo.description} />
      </Head>
      <Slide className={styles.musingsPage}>{children}</Slide>
    </>
  );
}

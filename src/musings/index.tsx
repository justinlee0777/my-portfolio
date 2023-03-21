import styles from './index.module.scss';

import Head from 'next/head';

import Slide from '../components/slide/slide';
import { MusingConfig } from './components/musing/musing.config';
import { MusingsPageConfig } from './musings-page.config';
import Musings from './components/musings/musings';

export interface MusingsPageProps {
  config: MusingsPageConfig;

  musings: Array<MusingConfig>;

  children?: JSX.Element;
}

export default function MusingsPage({
  config,
  musings,
}: MusingsPageProps): JSX.Element {
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
          {config.textContent.content.map((paragraph, i) => (
            <p key={i} className={styles.musingsParagraph}>
              {paragraph}
            </p>
          ))}
          <Musings musings={musings} />
        </>
      </Slide>
    </>
  );
}

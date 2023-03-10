import styles from './index.module.scss';

import Head from 'next/head';
import Link from 'next/link';

import Slide from '../../../components/slide/slide';
import { MusingConfig } from './musing.config';
import UnitTestCheck from '../../../components/unit-test-check/unit-test-check';

export interface MusingPageProps {
  config: MusingConfig;
}

export default function MusingPage({ config }: MusingPageProps): JSX.Element {
  return (
    <>
      <Head>
        <title>{config.seo.title}</title>
        <meta name="description" content={config.seo.description} />
        <meta property="og:title" content={config.seo.title} />
        <meta property="og:description" content={config.seo.description} />
      </Head>
      <Slide className={styles.musingPage}>
        <>
          <Link href="/musings">Back</Link>
          <div
            dangerouslySetInnerHTML={{ __html: config.display.contentHtml }}
          />
          <UnitTestCheck
            componentName="Musing"
            style={{ position: 'absolute', top: 0, right: 0 }}
          />
        </>
      </Slide>
    </>
  );
}

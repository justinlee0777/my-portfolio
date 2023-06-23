import styles from './index.module.scss';

import Head from 'next/head';
import Link from 'next/link';

import FlexibleBookComponent from 'prospero/web/flexible-book';
import { NewlineTransformer } from 'prospero/web/transformers';
import {
  listenToClickEvents,
  listenToKeyboardEvents,
} from 'prospero/web/listeners';
import {
  DoublePageBookAnimation,
  SinglePageBookAnimation,
} from 'prospero/web/animations';
import { useBook } from 'prospero/web/react';
import { useRef, useState } from 'react';

import Slide from '../../../components/slide/slide';
import { MusingConfig } from './musing.config';
import UnitTestCheck from '../../../components/unit-test-check/unit-test-check';
import { Font } from '../../../config/font.enum';
import Switch from '../../../components/switch/switch';

export interface MusingPageProps {
  config: MusingConfig;
  font: Font;
}

export default function MusingPage({
  config,
  font,
}: MusingPageProps): JSX.Element {
  const mainRef = useRef<HTMLElement>(null);

  const [bookMode, setBookMode] = useState(false);
  useBook(
    mainRef,
    () => {
      if (bookMode) {
        return FlexibleBookComponent(
          {
            text: config.display.contentHtml,
            pageStyles: {
              computedFontFamily: font,
              computedFontSize: '16px',
              lineHeight: 32,
              padding: {
                top: 36,
                right: 18,
                bottom: 36,
                left: 18,
              },
            },
            mediaQueryList: [
              {
                pagesShown: 1,
                listeners: [listenToClickEvents],
                animation: new SinglePageBookAnimation(),
              },
              {
                pattern: {
                  minWidth: 800,
                },
                config: {
                  pagesShown: 2,
                  listeners: [listenToClickEvents, listenToKeyboardEvents],
                  animation: new DoublePageBookAnimation(),
                },
              },
            ],
          },
          {
            transformers: [new NewlineTransformer()],
            forHTML: true,
          },
          {
            styles: {
              width: '80vw',
              height: '90vh',
              maxWidth: '800px',
              margin: 'auto',
            },
          }
        );
      }
    },
    [font, bookMode]
  );

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
          <Link className={styles.musingBack} href="/musings">
            Back
          </Link>
          <p className={styles.bookMode}>
            <Switch
              className={styles.bookModeSwitch}
              value={bookMode}
              onChange={(bookModeChange) => setBookMode(bookModeChange)}
            />
            Show as book
          </p>
          <main className={styles.musingArticle} ref={mainRef}>
            {!bookMode && (
              <div
                dangerouslySetInnerHTML={{
                  __html: config.display.contentHtml,
                }}
              />
            )}
          </main>
          <UnitTestCheck
            componentName="Musing"
            style={{ position: 'absolute', top: 0, right: 0 }}
          />
        </>
      </Slide>
    </>
  );
}

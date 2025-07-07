import styles from './index.module.scss';

import Head from 'next/head';
import Link from 'next/link';

import {
  DoublePageBookAnimation,
  SinglePageBookAnimation,
} from 'prospero/web/book/animations';
import {
  listenToClickEvents,
  listenToKeyboardEvents,
} from 'prospero/web/book/listeners';
import { FlexibleBookComponent } from 'prospero/web/flexible-book';
import { useBook } from 'prospero/web/react';
import { useRef, useState, type JSX } from 'react';

import dynamic from 'next/dynamic';
import Slide from '../../../components/slide/slide';
import Switch from '../../../components/switch/switch';
import UnitTestCheck from '../../../components/unit-test-check/unit-test-check';
import MusingPageProps from '../../models/musing-props.interface';

const AIForm = dynamic(() => import('../../../components/ai-form/ai-form'));

export default function MusingPage({
  config,
  font,
  showAIForm,
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
          undefined,
          {
            styles: {
              width: '80vw',
              height: '90vh',
              maxWidth: '800px',
              margin: 'auto',
            },
          }
        );
      } else {
        return null;
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
            {showAIForm && <AIForm />}
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

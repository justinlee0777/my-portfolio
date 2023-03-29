import styles from './page.module.scss';

import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { cloneDeep } from 'lodash-es';
import Head from 'next/head';

import { needsLoading } from './config/font.enum';
import { loadFont } from './config/load-font.function';
import { Font } from './config/font.enum';
import { SlideAnimation } from './config/slide-animation.enum';
import { Theme } from './config/theme.enum';
import LoadingScreen from './components/loading-screen/loading-screen';
import Slide from './components/slide/slide';
import {
  getPageDefaults,
  setPageDefaults,
} from './config/get-page-defaults.function';
import OpenSettings from './components/open-settings/open-settings';
import { Navigation } from './components/navigation/navigation';
import { UnitTestContext } from './contexts/unit-test.context';
import { HomePageProps } from './page-utils/get-localized-homepage-props.function';
import { BuzzwordBingoPageProps } from './page-utils/get-localized-buzzword-bingo-props.function';
import { RpgGamePageProps } from './page-utils/get-localized-rpg-game-props.function';
import { MusingPageProps } from './page-utils/get-musing-props.function';
import { MusingsPageProps } from './page-utils/get-musings-props.function';
import UnitTestCheck from './components/unit-test-check/unit-test-check';
import { RandomOfTheDayPageProps } from './page-utils/get-localized-random-of-the-day-props.function';
import { Modal } from './services/modal';

export type PageProps =
  | HomePageProps
  | BuzzwordBingoPageProps
  | RpgGamePageProps
  | MusingPageProps
  | MusingsPageProps
  | RandomOfTheDayPageProps;

export default function Page({
  Component,
  pageProps,
}: {
  Component;
  pageProps: PageProps;
}): JSX.Element {
  const config = useMemo(() => {
    return getPageDefaults() || pageProps.pageConfig;
  }, []);

  const [font, setFont] = useState(config.defaults.font);
  const [theme, setTheme] = useState(config.defaults.theme);
  const [animation, setAnimation] = useState(config.defaults.animation);
  const [developerMode, setDeveloperMode] = useState(
    config.defaults.developerMode
  );

  const [loading, setLoading] = useState(needsLoading(font));
  const [modal, setModal] = useState<JSX.Element | null>(null);

  const modalService = useMemo(() => new Modal(setModal), []);

  // Saving page defaults into session storage
  useEffect(() => {
    const clonedPageConfig = cloneDeep(config);
    clonedPageConfig.defaults.font = font;
    clonedPageConfig.defaults.theme = theme;
    clonedPageConfig.defaults.animation = animation;
    clonedPageConfig.defaults.developerMode = developerMode;

    setPageDefaults(clonedPageConfig);
  }, [config, font, theme, animation, developerMode]);

  // Loading fonts
  useEffect(() => {
    if (loading) {
      loadFont(font).then(() => {
        setLoading(false);
      });
    }
  }, [loading, font]);

  let loadingScreen: JSX.Element;

  if (loading) {
    loadingScreen = (
      <Slide
        className={`${styles.slide} ${styles.loadingScreen}`}
        key="loading-screen"
      >
        <LoadingScreen />
      </Slide>
    );
  }

  const fontClass = styles[`font-${font.replace(/ /g, '')}`];
  const themeClass = styles[`theme-${theme.replace(' ', '')}`];
  const animationClass = styles[`animation-${animation.replace(/ /g, '')}`];

  const pageClassnames = classNames(
    styles.page,
    fontClass,
    themeClass,
    animationClass
  );

  const stateProps = {
    font,
    theme,
    animation,
    developerMode,
    onFontChange: (font: Font) => {
      setFont(font);
      setLoading(needsLoading(font));
    },
    onThemeChange: (theme: Theme) => setTheme(theme),
    onAnimationChange: (animation: SlideAnimation) => setAnimation(animation),
    onDeveloperModeChange: (developerMode: boolean) =>
      setDeveloperMode(developerMode),
  };

  let settingsIcon: JSX.Element;

  if ('openSettingsConfig' in pageProps) {
    settingsIcon = (
      <OpenSettings
        className={styles.settingsMenu}
        config={pageProps.openSettingsConfig}
        route={pageProps.route}
        {...stateProps}
      />
    );
  }

  let topNavbar: JSX.Element | undefined;
  let bottomNavbar: JSX.Element | undefined;

  const { hide, reverse } = pageProps.navbar ?? {};

  if (!hide) {
    const navigationClassnames = classNames(styles.pageNavigation, {
      [styles.pageNavigationBottom]: reverse,
    });
    const navigationComponent = (
      <Navigation
        className={navigationClassnames}
        locale={pageProps.locale}
        links={[
          {
            displayName: 'Random of the Day',
            url: `/${pageProps.locale}/random-of-the-day`,
          },
          {
            displayName: 'Musings',
            url: '/musings',
          },
          {
            displayName: 'Buzzword Bingo',
            url: `/${pageProps.locale}/buzzword-bingo`,
          },
          {
            displayName: 'RPG',
            url: `/${pageProps.locale}/rpg-game`,
          },
        ]}
      />
    );

    if (reverse) {
      bottomNavbar = navigationComponent;
    } else {
      topNavbar = navigationComponent;
    }
  }

  return (
    <UnitTestContext.Provider
      value={{ results: pageProps.unitTestResult, developerMode }}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={pageClassnames} data-testid="page-container">
        <UnitTestCheck componentName="App" style={{ zIndex: 5 }} />
        {topNavbar}
        <div id="main-content" className={styles.pageContent}>
          <Component
            className={styles.pageComponent}
            modal={modalService}
            {...pageProps}
            {...stateProps}
          />
          {settingsIcon}
          {loadingScreen}
          {modal}
        </div>
      </div>
      {bottomNavbar}
    </UnitTestContext.Provider>
  );
}

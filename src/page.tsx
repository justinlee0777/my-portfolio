import styles from './page.module.scss';

import classNames from 'classnames';
import Head from 'next/head';
import { useEffect, useMemo, useState, type JSX } from 'react';

import LoadingScreen from './components/loading-screen/loading-screen';
import NavigationPane from './components/navigation-pane/navigation-pane';
import Navigation from './components/navigation/navigation';
import Slide from './components/slide/slide';
import UnitTestCheck from './components/unit-test-check/unit-test-check';
import {
  getPageDefaults,
  setPageDefaults,
} from './config/get-page-defaults.function';
import loadFont from './config/load-font.function';
import needsLoading from './config/needs-loading.function';
import SettingsContextData from './contexts/settings/settings-context-data.model';
import SettingsContext from './contexts/settings/settings.context';
import UnitTestContext from './contexts/unit-test/unit-test.context';
import Font from './models/font.enum';
import SlideAnimation from './models/slide-animation.enum';
import Theme from './models/theme.enum';
import BuzzwordBingoPageProps from './page-utils/buzzword-bingo/buzzword-bingo-page-props.model';
import { MusingPageProps } from './page-utils/get-musing-props.function';
import { MusingsPageProps } from './page-utils/get-musings-props.function';
import HomepagePageProps from './page-utils/homepage/homepage-page-props.interface';
import RandomOfTheDayPageProps from './page-utils/random-of-the-day/random-of-the-day-pages-props.interface';
import { Modal } from './services/modal';

export type PageProps =
  | HomepagePageProps
  | BuzzwordBingoPageProps
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
  const pageDefaults = pageProps.pageConfig.defaults;

  const [font, setFont] = useState<Font>(pageDefaults.font);
  const [theme, setTheme] = useState<Theme>(pageDefaults.theme);
  const [animation, setAnimation] = useState<SlideAnimation>(
    pageDefaults.animation
  );
  const [developerMode, setDeveloperMode] = useState<boolean>(
    pageDefaults.developerMode
  );

  const [fontLoading, setFontLoading] = useState(needsLoading(font));
  const [modal, setModal] = useState<JSX.Element | null>(null);

  const modalService = useMemo(() => new Modal(setModal), []);

  useEffect(() => {
    const savedConfig = getPageDefaults();

    if (savedConfig) {
      setFont(savedConfig.font);
      setTheme(savedConfig.theme);
      setAnimation(savedConfig.animation);
      setDeveloperMode(savedConfig.developerMode);
    }
  }, []);

  // Saving page defaults into session storage
  useEffect(() => {
    setPageDefaults({
      font,
      theme,
      animation,
      developerMode,
    });
  }, [font, theme, animation, developerMode]);

  // Loading fonts
  useEffect(() => {
    if (fontLoading) {
      loadFont(font).then(() => {
        setFontLoading(false);
      });
    }
  }, [fontLoading, font]);

  let loadingScreen: JSX.Element = <></>;

  if (fontLoading) {
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

  const settingsContextValue: SettingsContextData = {
    font,
    theme,
    animation,
    developerMode,
    onFontChange: (font: Font) => {
      setFont(font);
      setFontLoading(needsLoading(font));
    },
    onThemeChange: (theme: Theme) => setTheme(theme),
    onAnimationChange: (animation: SlideAnimation) => setAnimation(animation),
    onDeveloperModeChange: (developerMode: boolean) =>
      setDeveloperMode(developerMode),
  };

  let settingsIcon: JSX.Element = <></>;

  if ('openSettingsConfig' in pageProps) {
    settingsIcon = (
      <NavigationPane
        className={styles.settingsMenu}
        config={pageProps.openSettingsConfig!}
        route={pageProps.route}
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
        links={pageProps.pageConfig.navigationLinks}
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
          <SettingsContext.Provider value={settingsContextValue}>
            <Component
              className={styles.pageComponent}
              modal={modalService}
              {...pageProps}
            />
            {settingsIcon}
          </SettingsContext.Provider>
          {loadingScreen}
          {modal}
        </div>
      </div>
      {bottomNavbar}
    </UnitTestContext.Provider>
  );
}

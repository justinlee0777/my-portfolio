import './styles.scss';
import styles from './app.module.scss';

import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { cloneDeep } from 'lodash-es';
import Head from 'next/head';

import { needsLoading } from '../config/font.enum';
import { loadFont } from '../config/load-font.function';
import { Font } from '../config/font.enum';
import { SlideAnimation } from '../config/slide-animation.enum';
import { Theme } from '../config/theme.enum';
import LoadingScreen from '../components/loading-screen/loading-screen';
import Slide from '../components/slide/slide';
import {
  getPageDefaults,
  setPageDefaults,
} from '../config/get-page-defaults.function';
import OpenSettings from '../components/open-settings/open-settings';
import { Navigation } from '../components/navigation/navigation';
import { UnitTestContext } from '../contexts/unit-test.context';
import { HomePageProps } from '../page-utils/get-localized-homepage-props.function';
import { BuzzwordBingoPageProps } from '../page-utils/get-localized-buzzword-bingo-props.function';
import { RpgGamePageProps } from '../page-utils/get-localized-rpg-game-props.function';

interface ErrorPageProps {
  statusCode: number;
}

type RegularAppProps =
  | HomePageProps
  | BuzzwordBingoPageProps
  | RpgGamePageProps;

type MyAppProps = RegularAppProps | ErrorPageProps;

export default function MyApp({
  Component,
  pageProps,
}: {
  Component;
  pageProps: MyAppProps;
}): JSX.Element {
  if ('statusCode' in pageProps && pageProps.statusCode >= 400) {
    return <Component {...pageProps} />;
  } else {
    return (
      <RegularPage
        Component={Component}
        pageProps={pageProps as RegularAppProps}
      />
    );
  }
}

function RegularPage({
  Component,
  pageProps,
}: {
  Component;
  pageProps: RegularAppProps;
}): JSX.Element {
  const config = pageProps.pageConfig;
  const [font, setFont] = useState(config.defaults.font);
  const [theme, setTheme] = useState(config.defaults.theme);
  const [animation, setAnimation] = useState(config.defaults.animation);
  const [developerMode, setDeveloperMode] = useState(
    config.defaults.developerMode
  );

  const [loading, setLoading] = useState(needsLoading(font));

  // Getting saved page defaults from storage
  useEffect(() => {
    const savedPageConfig = getPageDefaults();

    if (savedPageConfig) {
      setFont(savedPageConfig.defaults.font);
      setLoading(needsLoading(savedPageConfig.defaults.font));

      setTheme(savedPageConfig.defaults.theme);
      setAnimation(savedPageConfig.defaults.animation);
      setDeveloperMode(savedPageConfig.defaults.developerMode);
    }
  }, []);

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

  const pageClassnames = classNames(styles.page, fontClass, themeClass);

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

  return (
    <UnitTestContext.Provider
      value={{ results: pageProps.unitTestResult, developerMode }}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={pageClassnames}>
        <Navigation
          className={styles.pageNavigation}
          links={[
            {
              displayName: 'Justin Lee',
              url: `/${pageProps.locale}/`,
              isHome: true,
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
        <main id="main-content" className={styles.pageContent}>
          <Component
            className={styles.pageComponent}
            {...pageProps}
            {...stateProps}
          />
          {settingsIcon}
          {loadingScreen}
        </main>
      </div>
    </UnitTestContext.Provider>
  );
}

import './styles.scss';
import styles from './app.module.scss';

import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { cloneDeep } from 'lodash-es';

import { PageConfig } from '../config/page.config';
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
import { HomepageConfig } from '../homepage/homepage.config';
import { OpenSettingsConfig } from '../config/open-settings.config';
import { Navigation } from '../components/navigation/navigation';
import {
  UnitTestContext,
  UnitTestResults,
} from '../contexts/unit-test.context';
import { RpgGamePageConfig } from '../rpg-game-page/rpg-game-page.config';

interface HomepageProps {
  pageConfig: PageConfig;
  homepageConfig: HomepageConfig;
  generatedProfilePictureUrl: string;
  profilePicturePrompt: string;
  unitTestResult: UnitTestResults;
}

interface BuzzwordBingoProps {
  pageConfig: PageConfig;
  unitTestResult: UnitTestResults;
  openSettingsConfig: OpenSettingsConfig;
}

interface RpgGameProps {
  pageConfig: PageConfig;
  rpgGameConfig: RpgGamePageConfig;
  openSettingsConfig: OpenSettingsConfig;
  unitTestResult: UnitTestResults;
}

interface ErrorPageProps {
  statusCode: number;
}

type RegularAppProps = HomepageProps | BuzzwordBingoProps | RpgGameProps;

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

  const [loading, setLoading] = useState(needsLoading(font));

  // Getting saved page defaults from storage
  useEffect(() => {
    const savedPageConfig = getPageDefaults();

    if (savedPageConfig) {
      setFont(savedPageConfig.defaults.font);
      setLoading(needsLoading(savedPageConfig.defaults.font));

      setTheme(savedPageConfig.defaults.theme);
      setAnimation(savedPageConfig.defaults.animation);
    }
  }, []);

  // Saving page defaults into session storage
  useEffect(() => {
    const clonedPageConfig = cloneDeep(config);
    clonedPageConfig.defaults.font = font;
    clonedPageConfig.defaults.theme = theme;
    clonedPageConfig.defaults.animation = animation;

    setPageDefaults(clonedPageConfig);
  }, [config, font, theme, animation]);

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
    onFontChange: (font: Font) => {
      setFont(font);
      setLoading(needsLoading(font));
    },
    onThemeChange: (theme: Theme) => setTheme(theme),
    onAnimationChange: (animation: SlideAnimation) => setAnimation(animation),
  };

  let settingsIcon: JSX.Element;

  if ('openSettingsConfig' in pageProps) {
    settingsIcon = (
      <OpenSettings
        className={styles.settingsMenu}
        config={pageProps.openSettingsConfig}
        {...stateProps}
      />
    );
  }

  return (
    <UnitTestContext.Provider value={pageProps.unitTestResult}>
      <div className={pageClassnames}>
        <Navigation
          className={styles.pageNavigation}
          links={[
            {
              displayName: 'Justin Lee',
              url: '/',
              isHome: true,
            },
            {
              displayName: 'Buzzword Bingo',
              url: '/buzzword-bingo',
            },
            {
              displayName: 'RPG',
              url: '/rpg-game',
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

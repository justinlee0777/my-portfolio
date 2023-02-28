import './styles.scss';
import styles from './app.module.scss';

import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { cloneDeep } from 'lodash-es';

import {
  Font,
  isFancyAnimation,
  loadFont,
  needsLoading,
  PageConfig,
  SlideAnimation,
  Theme,
} from '../config';
import LoadingScreen from '../components/loading-screen/loading-screen';
import Slide from '../components/slide/slide';
import {
  getPageDefaults,
  setPageDefaults,
} from '../config/get-page-defaults.function';
import OpenSettings from '../components/open-settings/open-settings';

export default function MyApp({ Component, pageProps }): JSX.Element {
  const config: PageConfig = pageProps.pageConfig;
  const [font, setFont] = useState(config.defaults.font);
  const [theme, setTheme] = useState(config.defaults.theme);
  const [animation, setAnimation] = useState(config.defaults.animation);

  const [loading, setLoading] = useState(false);

  // Getting saved page defaults from storage
  useEffect(() => {
    const savedPageConfig = getPageDefaults();

    if (savedPageConfig) {
      setFont(savedPageConfig.defaults.font);
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
  }, [font, theme, animation]);

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
    onAnimationChange: (animation: SlideAnimation) => {
      if (isFancyAnimation(animation)) {
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setAnimation(animation);
    },
  };

  let settingsIcon: JSX.Element;

  if (pageProps.openSettingsConfig) {
    settingsIcon = (
      <OpenSettings
        className={styles.settingsMenu}
        config={pageProps.openSettingsConfig}
        {...stateProps}
      />
    );
  }

  return (
    <div className={pageClassnames}>
      <Component {...pageProps} {...stateProps} />
      {settingsIcon}
      {loadingScreen}
    </div>
  );
}

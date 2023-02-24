import styles from './index.module.scss';

import { useState } from 'react';

import DeveloperDescription from './components/developer-description/developer-description';
import Resume from './components/resume/resume';
import RpgGame from './components/rpg-game/rpg-game';
import Settings from './components/settings/settings';
import Slide from './components/slide/slide';
import { homepageConfig } from './homepage.config';

function HomePage() {
  const [theme, setTheme] = useState(homepageConfig.defaults.theme);

  const content = [
    <DeveloperDescription
      key="developer-description"
      config={homepageConfig.developerDescription}
    />,
    <Settings
      key="settings"
      selectedOption={theme}
      onThemeChange={(theme) => setTheme(theme)}
    />,
    <RpgGame key="rpg-game" config={homepageConfig.rpgGame} />,
    <Resume key="resume" config={homepageConfig.resume} />,
  ];

  const slides = content.map((component, i) => (
    <Slide key={`slide-${i}`}>{component}</Slide>
  ));

  const themeClass = styles[`theme-${theme.replace(' ', '')}`];

  return <div className={`${styles.homepage} ${themeClass}`}>{slides}</div>;
}

export default HomePage;

import styles from './index.module.scss';

import { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';

import DeveloperDescription from './components/developer-description/developer-description';
import Resume from './components/resume/resume';
import RpgGame from './components/rpg-game/rpg-game';
import Settings from './components/settings/settings';
import Slide from './components/slide/slide';
import { isFancyAnimation } from './slide-animation.enum';
import { HomepageConfig } from './homepage.config';
import LoadingScreen from './components/loading-screen/loading-screen';
import { needsLoading } from './font.enum';
import { loadFont } from './load-font.function';

export interface HomepageProps {
  homepageConfig: HomepageConfig;
  generatedProfilePictureUrl: string;
  profilePicturePrompt: string;
}

export default function HomePage({
  homepageConfig,
  generatedProfilePictureUrl,
  profilePicturePrompt,
}: HomepageProps): JSX.Element {
  const [font, setFont] = useState(homepageConfig.defaults.font);
  const [theme, setTheme] = useState(homepageConfig.defaults.theme);
  const [animation, setAnimation] = useState(homepageConfig.defaults.animation);

  const [loading, setLoading] = useState(false);
  const [animatedSlides, setAnimatedSlides] = useState<Array<string>>([]);

  const homepageRef = useRef<HTMLDivElement>(null);

  let intersectionObserver: IntersectionObserver;

  // Loading fonts
  useEffect(() => {
    if (loading) {
      loadFont(font).then(() => {
        setLoading(false);
      });
    }
  }, [loading, font]);

  // Animating slides when the user scrolls over them
  useEffect(() => {
    if (isFancyAnimation(animation)) {
      const intersectedSlides: Array<string> = [];

      intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              intersectedSlides.push(entry.target.id);
            }
          });

          let currentAnimatedSlides = animatedSlides;
          const newSlides = intersectedSlides.filter(
            (slide) => !animatedSlides.includes(slide)
          );

          if (newSlides.length > 0) {
            currentAnimatedSlides = animatedSlides.concat(newSlides);
            setAnimatedSlides(currentAnimatedSlides);
          }
        },
        { threshold: 0.4 }
      );

      homepageRef.current.childNodes.forEach((child: HTMLElement) => {
        if (!animatedSlides.includes(child.id)) {
          intersectionObserver.observe(child as HTMLElement);
        }
      });

      return () => intersectionObserver.disconnect();
    }
  }, [animation, animatedSlides]);

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

  const content = [
    <DeveloperDescription
      key="developer-description"
      config={homepageConfig.developerDescription}
      generatedProfilePictureUrl={generatedProfilePictureUrl}
      profilePicturePrompt={profilePicturePrompt}
    />,
    <Settings
      key="settings"
      config={homepageConfig.settings}
      selectedFont={font}
      selectedTheme={theme}
      selectedAnimation={animation}
      onFontChange={(font) => {
        setFont(font);
        setLoading(needsLoading(font));
      }}
      onThemeChange={(theme) => setTheme(theme)}
      onAnimationChange={(animation) => {
        if (isFancyAnimation) {
          document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setAnimation(animation);
        setAnimatedSlides([]);
      }}
    />,
    <RpgGame key="rpg-game" config={homepageConfig.rpgGame} />,
    <Resume key="resume" config={homepageConfig.resume} />,
  ];

  const slides = content.map((component, i) => {
    const id = `slide-${i}`;

    const animationString = animation.replace(' ', '');

    const slideClassName = classnames(
      styles.slide,
      styles[`slide-${animationString}`],
      {
        [styles[`slide-${animationString}-activated`]]:
          animatedSlides.includes(id),
      }
    );

    return (
      <Slide className={slideClassName} id={id} key={`slide-${i}`}>
        {component}
      </Slide>
    );
  });

  const fontClass = styles[`font-${font.replace(/ /g, '')}`];
  const themeClass = styles[`theme-${theme.replace(' ', '')}`];

  return (
    <div
      className={`${styles.homepage} ${themeClass} ${fontClass}`}
      ref={homepageRef}
    >
      {slides}
      {loadingScreen}
    </div>
  );
}

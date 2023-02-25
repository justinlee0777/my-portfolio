import styles from './index.module.scss';

import { useEffect, useRef, useState } from 'react';

import DeveloperDescription from './components/developer-description/developer-description';
import Resume from './components/resume/resume';
import RpgGame from './components/rpg-game/rpg-game';
import Settings from './components/settings/settings';
import Slide from './components/slide/slide';
import { SlideAnimation } from './slide-animation.enum';
import { HomepageConfig } from './homepage.config';

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
  const [theme, setTheme] = useState(homepageConfig.defaults.theme);
  const [animation, setAnimation] = useState(homepageConfig.defaults.animation);
  const [animatedSlides, setAnimatedSlides] = useState<Array<string>>([]);

  const homepageRef = useRef<HTMLDivElement>(null);

  let intersectionObserver: IntersectionObserver;

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
      selectedTheme={theme}
      selectedAnimation={animation}
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
    const activated = animatedSlides.includes(id)
      ? `slide-${animation.replace(' ', '')}-activated`
      : '';

    return (
      <Slide
        className={`${styles.slide} ${
          styles[`slide-${animation.replace(' ', '')}`]
        } ${styles[activated]}`}
        id={id}
        key={`slide-${i}`}
      >
        {component}
      </Slide>
    );
  });

  const themeClass = styles[`theme-${theme.replace(' ', '')}`];

  return (
    <div className={`${styles.homepage} ${themeClass}`} ref={homepageRef}>
      {slides}
    </div>
  );
}

function isFancyAnimation(animation: SlideAnimation): boolean {
  return animation !== SlideAnimation.NONE;
}

import styles from './index.module.scss';

import { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';

import DeveloperDescription from './components/developer-description/developer-description';
import Resume from './components/resume/resume';
import RpgGame from './components/rpg-game/rpg-game';
import Settings from './components/settings/settings';
import Slide from '../components/slide/slide';
import { HomepageConfig } from './homepage.config';
import { Theme, isFancyAnimation, SlideAnimation, Font } from '../config';

export interface HomepageProps {
  homepageConfig: HomepageConfig;

  generatedProfilePictureUrl: string;
  profilePicturePrompt: string;

  font: Font;
  theme: Theme;
  animation: SlideAnimation;

  onFontChange: (font: Font) => void;
  onThemeChange: (theme: Theme) => void;
  onAnimationChange: (animation: SlideAnimation) => void;
}

export default function HomePage({
  homepageConfig,
  generatedProfilePictureUrl,
  profilePicturePrompt,

  font,
  theme,
  animation,

  onFontChange,
  onThemeChange,
  onAnimationChange,
}: HomepageProps): JSX.Element {
  const [animatedSlides, setAnimatedSlides] = useState<Array<string>>([]);

  const homepageRef = useRef<HTMLDivElement>(null);

  let intersectionObserver: IntersectionObserver;

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
      onFontChange={onFontChange}
      onThemeChange={onThemeChange}
      onAnimationChange={(animation) => {
        onAnimationChange(animation);
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

  return (
    <div className={`${styles.homepage}`} ref={homepageRef}>
      {slides}
    </div>
  );
}

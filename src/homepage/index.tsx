import styles from './index.module.scss';

import { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import Head from 'next/head';

import DeveloperDescription from './components/developer-description/developer-description';
import Resume from './components/resume/resume';
import Settings from '../components/settings/settings';
import Slide from '../components/slide/slide';
import { HomepageConfig } from './homepage.config';
import {
  AnimatedSlides,
  animateSlides,
} from '../utils/animate-slides.function';
import Font from '../models/font.enum';
import Theme from '../models/theme.enum';
import SlideAnimation from '../models/slide-animation.enum';

export interface HomepageProps {
  locale: string;

  homepageConfig: HomepageConfig;

  generatedProfilePictureUrl: string;
  profilePicturePrompt: string;

  font: Font;
  theme: Theme;
  animation: SlideAnimation;
  developerMode: boolean;

  onFontChange: (font: Font) => void;
  onThemeChange: (theme: Theme) => void;
  onAnimationChange: (animation: SlideAnimation) => void;
  onDeveloperModeChange: (developerMode: boolean) => void;
}

export default function HomePage({
  homepageConfig,
  generatedProfilePictureUrl,
  profilePicturePrompt,

  font,
  theme,
  animation,
  developerMode,

  onFontChange,
  onThemeChange,
  onAnimationChange,
  onDeveloperModeChange,
}: HomepageProps): JSX.Element {
  const [animatedSlides, setAnimatedSlides] = useState<AnimatedSlides>({});

  const homepageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return animateSlides(
      animation,
      [...homepageRef.current.childNodes] as Array<HTMLElement>,
      { get: animatedSlides, set: setAnimatedSlides }
    );
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
      font={font}
      theme={theme}
      animation={animation}
      developerMode={developerMode}
      onFontChange={onFontChange}
      onThemeChange={onThemeChange}
      onAnimationChange={(animation) => {
        onAnimationChange(animation);
        setAnimatedSlides({});
      }}
      onDeveloperModeChange={onDeveloperModeChange}
    />,
    <Resume key="resume" config={homepageConfig.resume} />,
  ];

  const slides = content.map((component, i) => {
    const id = `slide-${i}`;

    return (
      <Slide
        className={styles.slide}
        animated={animatedSlides[id] ? 'activated' : 'unactivated'}
        id={id}
        key={`slide-${i}`}
      >
        {component}
      </Slide>
    );
  });

  return (
    <>
      <Head>
        <title>{homepageConfig.seo.title}</title>
        <meta name="description" content={homepageConfig.seo.description} />
        <meta property="og:title" content={homepageConfig.seo.title} />
        <meta
          property="og:description"
          content={homepageConfig.seo.description}
        />
      </Head>
      <div className={styles.homepage} ref={homepageRef}>
        {slides}
      </div>
    </>
  );
}

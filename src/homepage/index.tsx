import styles from './index.module.scss';

import Head from 'next/head';
import { useContext, useEffect, useRef, useState } from 'react';

import Settings from '../components/settings/settings';
import Slide from '../components/slide/slide';
import SettingsContext from '../contexts/settings/settings.context';
import {
  AnimatedSlides,
  animateSlides,
} from '../utils/animate-slides.function';
import DeveloperDescription from './components/developer-description/developer-description';
import Resume from './components/resume/resume';
import { HomepageConfig } from './homepage.config';

export interface HomepageProps {
  locale: string;

  homepageConfig: HomepageConfig;

  generatedProfilePictureUrl: string;
  profilePicturePrompt: string;
}

export default function HomePage({
  homepageConfig,
  generatedProfilePictureUrl,
  profilePicturePrompt,
}: HomepageProps): JSX.Element {
  const { animation } = useContext(SettingsContext);
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
    <Settings key="settings" config={homepageConfig.settings} />,
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

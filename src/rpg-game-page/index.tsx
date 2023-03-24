import styles from './index.module.scss';

import Head from 'next/head';

import Slide from '../components/slide/slide';
import { RpgGamePageConfig } from './rpg-game-page.config';
import RpgGame from './components/rpg-game/rpg-game';
import { SlideAnimation } from '../config/slide-animation.enum';

export interface RpgGameProps {
  rpgGameConfig: RpgGamePageConfig;
  animation: SlideAnimation;
}

export default function RpgGamePage({
  rpgGameConfig,
  animation,
}: RpgGameProps) {
  return (
    <Slide className={styles.slide}>
      <>
        <Head>
          <title>{rpgGameConfig.seo.title}</title>
          <meta name="description" content={rpgGameConfig.seo.description} />
          <meta property="og:title" content={rpgGameConfig.seo.title} />
          <meta
            property="og:description"
            content={rpgGameConfig.seo.description}
          />
        </Head>
        <RpgGame
          key="rpg-game"
          config={rpgGameConfig.config}
          animation={animation}
        />
      </>
    </Slide>
  );
}

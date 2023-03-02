import styles from './index.module.scss';

import Head from 'next/head';

import Slide from '../components/slide/slide';
import { RpgGamePageConfig } from './rpg-game-page.config';
import RpgGame from './components/rpg-game/rpg-game';
import { SlideAnimation } from '../config';

export interface RpgGameProps {
  rpgGameConfig: RpgGamePageConfig;
  animation: SlideAnimation;
}

export default function BuzzwordBingoPage({
  rpgGameConfig,
  animation,
}: RpgGameProps) {
  return (
    <Slide className={styles.slide}>
      <>
        <Head>
          <title>Turn-based RPG</title>
          <meta
            name="description"
            content="Turn-based role playing game. Only the battle system is anywhere complete."
          />
          <meta property="og:title" content="Turn-based RPG" />
          <meta
            property="og:description"
            content="Turn-based role playing game. Only the battle system is anywhere complete."
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

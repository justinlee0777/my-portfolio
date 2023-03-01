import styles from './index.module.scss';

import Head from 'next/head';

import Slide from '../components/slide/slide';
import { RpgGamePageConfig } from './rpg-game-page.config';
import RpgGame from './components/rpg-game/rpg-game';

export interface RpgGameProps {
  rpgGameConfig: RpgGamePageConfig;
}

export default function BuzzwordBingoPage({ rpgGameConfig }: RpgGameProps) {
  return (
    <Slide className={styles.slide}>
      <>
        <Head>
          <title>Buzzword Bingo Generator</title>
          <meta
            name="description"
            content="Turn-based role playing game. Only the battle system is anywhere complete."
          />
        </Head>
        <RpgGame key="rpg-game" config={rpgGameConfig.config} />
      </>
    </Slide>
  );
}

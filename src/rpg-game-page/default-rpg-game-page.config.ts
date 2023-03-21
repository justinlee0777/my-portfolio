import { defaultRpgGameConfig } from './components/rpg-game/default-rpg-game.config';
import { RpgGamePageConfig } from './rpg-game-page.config';

export const defaultRpgGamePageConfig: RpgGamePageConfig = {
  seo: {
    title: 'Turn-based RPG',
    description:
      'Turn-based role playing game. Only the battle system is anywhere complete.',
  },
  config: defaultRpgGameConfig,
};

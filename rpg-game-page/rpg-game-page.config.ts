import {
  RpgGameConfig,
  getTranslationKeys as getRpgGameTranslationKeys,
} from './components/rpg-game/rpg-game.config';

export interface RpgGamePageConfig {
  config: RpgGameConfig;
}

export function getTranslationKeys(): Array<string> {
  return getRpgGameTranslationKeys().map((key) => `config.${key}`);
}

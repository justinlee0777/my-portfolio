import {
  RpgGameConfig,
  getTranslationKeys as getRpgGameTranslationKeys,
} from './components/rpg-game/rpg-game.config';

export interface RpgGamePageConfig {
  seo: {
    title: string;
    description: string;
  };
  config: RpgGameConfig;
}

const keysToTranslate = ['seo.title', 'seo.description'];

export function getTranslationKeys(): Array<string> {
  return [
    ...keysToTranslate,
    ...getRpgGameTranslationKeys().map((key) => `config.${key}`),
  ];
}

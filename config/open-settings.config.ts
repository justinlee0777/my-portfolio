import {
  SettingsConfig,
  getTranslationKeys as getSettingsTranslationKeys,
} from './settings.config';

export interface OpenSettingsConfig {
  settings: SettingsConfig;
  aria: {
    expandLabel: string;
    collapseLabel: string;
  };
}

const keysToTranslate = ['aria.expandLabel', 'aria.collapseLabel'];

export function getTranslationKeys(): Array<string> {
  return [
    ...getSettingsTranslationKeys().map((key) => `settings.${key}`),
    ...keysToTranslate,
  ];
}

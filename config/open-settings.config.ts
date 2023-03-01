import { SettingsConfig } from './settings.config';

export interface OpenSettingsConfig {
  settings: SettingsConfig;
  aria: {
    expandLabel: string;
    collapseLabel: string;
  };
}

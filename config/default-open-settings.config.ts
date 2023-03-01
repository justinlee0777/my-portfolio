import { OpenSettingsConfig } from './open-settings.config';

export const defaultOpenSettingsConfig: OpenSettingsConfig = {
  settings: {
    textContent: {
      header: '',
      subheader: 'Settings',
      prompt: '',
    },
  },
  aria: {
    expandLabel: 'Expand app settings menu',
    collapseLabel: 'Collapse app settings menu',
  },
};

import { OpenSettingsConfig } from './open-settings.config';

export const defaultOpenSettingsConfig: OpenSettingsConfig = {
  settings: {
    textContent: {
      header: '',
      subheader: 'Settings',
      prompt: '',
      marqueeExplanation: {
        templateString:
          'This MDN ${article} describes best what the marquee element had been.',
        urls: [
          'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/marquee',
        ],
      },
    },
  },
  aria: {
    expandLabel: 'Expand app settings menu',
    collapseLabel: 'Collapse app settings menu',
  },
};

import OpenSettingsConfig from '../components/open-settings/models/open-settings-config.interface';

export const defaultOpenSettingsConfig: OpenSettingsConfig = {
  settings: {
    textContent: {
      header: '',
      subheader: 'Settings',
      prompt: '',
      explanation: {
        translation: {
          templateString:
            'All languages except English were translated through ${Google Cloud Translation}.',
          urls: ['https://cloud.google.com/translate'],
        },
        marquee: {
          templateString:
            'This MDN ${article} describes best what the marquee element had been.',
          urls: [
            'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/marquee',
          ],
        },
        tiltPrism: {
          templateString: 'Courtesy towards ${Andy Clymer}',
          urls: ['https://fonts.google.com/specimen/Tilt+Prism'],
        },
        eater: {
          templateString: 'Courtesy towards ${Typomondo}',
          urls: ['https://fonts.google.com/specimen/Eater'],
        },
        developerMode:
          'Developer mode shows the passing/failing unit tests for components and other things usually hidden from the end user.',
      },
    },
  },
  aria: {
    expandLabel: 'Expand app settings menu',
    collapseLabel: 'Collapse app settings menu',
  },
};

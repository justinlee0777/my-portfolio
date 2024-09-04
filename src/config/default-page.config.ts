import Font from '../models/font.enum';
import PageConfig from '../models/page-config.model';
import SlideAnimation from '../models/slide-animation.enum';
import Theme from '../models/theme.enum';

export default function getPageConfig(locale: string): PageConfig {
  return {
    defaults: {
      font: Font.ARIAL,
      theme: Theme.MONOCHROME,
      animation: SlideAnimation.NONE,
      developerMode: false,
    },
    navigationLinks: [
      {
        displayName: 'Random of the Day',
        url: `/${locale}/random-of-the-day`,
      },
      {
        displayName: 'Prospero',
        url: '/prospero',
      },
      {
        displayName: 'Musings',
        url: '/musings',
      },
      {
        displayName: 'Buzzword Bingo',
        url: `/${locale}/buzzword-bingo`,
      },
      {
        displayName: 'Elden Ring Bot',
        url: '/elden-ring',
      },
    ],
  };
}

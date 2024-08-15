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
      /*
      There are two issues.
      1. Using a custom server removes Automatic Static Optimization. Therefore, for whatever reason, getStaticProps is called on the server.
      2. For whatever reason, calling "unified" from the "unified" package causes an EEXIST error from creating a new Socket. I legitimately have no idea why this is an issue.
      There are two possible solutions I thought of:
      1. Move this project to Vercel which can handle Next specifically so that everything hopefully just works (whether it fixes a package dependency issue or it implements static pages correctly);
      2. Use Next's specific integration with Markdown and hope Next figures out what the issue is.
      Sort of leaning towards 1) in case this will prevent other problems in the future. In any case, it's more work than I desire to make this one feature work.
      {
        displayName: 'Musings',
        url: '/musings',
      },
      */
      {
        displayName: 'Buzzword Bingo',
        url: `/${locale}/buzzword-bingo`,
      },
    ],
  };
}

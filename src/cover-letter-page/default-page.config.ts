import PageConfig from '../models/page-config.model';
import Font from '../models/font.enum';
import SlideAnimation from '../models/slide-animation.enum';
import Theme from '../models/theme.enum';

export const coverLetterPageConfig: PageConfig = {
  defaults: {
    font: Font.BOOKERLY,
    theme: Theme.MONOCHROME,
    animation: SlideAnimation.NONE,
    developerMode: false,
  },
  navigationLinks: [],
};

import { Font } from '../config/font.enum';
import PageConfig from '../config/page-config.model';
import { SlideAnimation } from '../config/slide-animation.enum';
import { Theme } from '../config/theme.enum';

export const coverLetterPageConfig: PageConfig = {
  defaults: {
    font: Font.BOOKERLY,
    theme: Theme.MONOCHROME,
    animation: SlideAnimation.NONE,
    developerMode: false,
  },
  navigationLinks: [],
};

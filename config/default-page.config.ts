import { Font } from './font.enum';
import { PageConfig } from './page.config';
import { SlideAnimation } from './slide-animation.enum';
import { Theme } from './theme.enum';

export const pageConfig: PageConfig = {
  defaults: {
    font: Font.ARIAL,
    theme: Theme.STARRY_NIGHT,
    animation: SlideAnimation.NONE,
  },
};

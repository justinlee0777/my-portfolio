import { Font } from './font.enum';
import { SlideAnimation } from './slide-animation.enum';
import { Theme } from './theme.enum';

export interface PageConfig {
  defaults: {
    font: Font;
    theme: Theme;
    animation: SlideAnimation;
  };
}

import NavigationProps from '../components/navigation/models/navigation-props.interface';
import Font from './font.enum';
import SlideAnimation from './slide-animation.enum';
import Theme from './theme.enum';

export default interface PageConfig {
  defaults: {
    font: Font;
    theme: Theme;
    animation: SlideAnimation;
    developerMode: boolean;
  };
  navigationLinks: NavigationProps['links'];
}

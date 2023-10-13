import Font from '../../models/font.enum';
import SlideAnimation from '../../models/slide-animation.enum';
import Theme from '../../models/theme.enum';

export default interface SettingsContextData {
  font: Font;
  theme: Theme;
  animation: SlideAnimation;
  developerMode: boolean;
  onFontChange: (font: Font) => void;
  onThemeChange: (theme: Theme) => void;
  onAnimationChange: (animation: SlideAnimation) => void;
  onDeveloperModeChange: (developerMode: boolean) => void;
}

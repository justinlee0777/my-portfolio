import Font from '../../../models/font.enum';
import SlideAnimation from '../../../models/slide-animation.enum';
import Theme from '../../../models/theme.enum';
import SettingsConfig from './settings-config.interface';

export default interface SettingsProps {
  config: SettingsConfig;
  font: string;
  theme: string;
  animation: string;
  developerMode: boolean;
  onFontChange: (font: Font) => void;
  onThemeChange: (theme: Theme) => void;
  onAnimationChange: (animation: SlideAnimation) => void;
  onDeveloperModeChange: (developerMode: boolean) => void;

  route?: string;
}

import { Font } from '../../../config/font.enum';
import { SlideAnimation } from '../../../config/slide-animation.enum';
import { Theme } from '../../../config/theme.enum';
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

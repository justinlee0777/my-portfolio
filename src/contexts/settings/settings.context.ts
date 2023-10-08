import { createContext } from 'react';

import SettingsContextData from './settings-context-data.model';
import Font from '../../models/font.enum';
import Theme from '../../models/theme.enum';
import SlideAnimation from '../../models/slide-animation.enum';

const noop = () => {};

const SettingsContext = createContext<SettingsContextData>({
  font: Font.ARIAL,
  theme: Theme.MONOCHROME,
  animation: SlideAnimation.NONE,
  developerMode: false,
  onFontChange: noop,
  onThemeChange: noop,
  onAnimationChange: noop,
  onDeveloperModeChange: noop,
});

export default SettingsContext;

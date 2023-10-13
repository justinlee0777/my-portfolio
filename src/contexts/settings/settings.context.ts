import { createContext } from 'react';

import Font from '../../models/font.enum';
import SlideAnimation from '../../models/slide-animation.enum';
import Theme from '../../models/theme.enum';
import SettingsContextData from './settings-context-data.model';

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

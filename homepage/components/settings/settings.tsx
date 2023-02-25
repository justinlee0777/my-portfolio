import styles from './settings.module.scss';

import { Theme } from '../../theme.enum';
import RadioGroup, {
  RadioGroupOption,
} from '../../../components/radiogroup/radiogroup';
import { SlideAnimation } from '../../slide-animation.enum';
import { SettingsConfig } from '../../homepage.config';

export interface SettingsProps {
  config: SettingsConfig;
  selectedTheme: string;
  selectedAnimation: string;
  onThemeChange: (theme: Theme) => void;
  onAnimationChange: (animation: SlideAnimation) => void;
}

export default function Settings({
  config,
  selectedTheme,
  selectedAnimation,
  onThemeChange,
  onAnimationChange,
}: SettingsProps): JSX.Element {
  const themes = Object.entries(Theme);
  const slideAnimations = Object.entries(SlideAnimation);

  const themingOptions: Array<RadioGroupOption> = themes.map((theme) => ({
    key: theme[1],
    label: theme[1],
    value: theme[0],
  }));

  const themingSelect = (
    <RadioGroup
      className={styles.selectGroup}
      legend="Theming"
      name="theming"
      key="theming"
      options={themingOptions}
      selectedOption={selectedTheme}
      onSelect={(themeKey) => onThemeChange(Theme[themeKey])}
    />
  );

  const animationOptions: Array<RadioGroupOption> = slideAnimations.map(
    (slideAnimation) => ({
      key: slideAnimation[1],
      label: slideAnimation[1],
      value: slideAnimation[0],
    })
  );

  const animationSelect = (
    <RadioGroup
      className={styles.selectGroup}
      legend="Animation"
      name="animation"
      key="animation"
      options={animationOptions}
      selectedOption={selectedAnimation}
      onSelect={(animation) => onAnimationChange(SlideAnimation[animation])}
    />
  );

  return (
    <>
      <h2 className={styles.settingsHeader}>{config.textContent.header}</h2>
      <h3>{config.textContent.subheader}</h3>
      <div>
        <p>{config.textContent.prompt}</p>
        {themingSelect}
        {animationSelect}
      </div>
    </>
  );
}

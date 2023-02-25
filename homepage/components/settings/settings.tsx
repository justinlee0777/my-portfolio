import styles from './settings.module.scss';

import { Theme } from '../../theme.enum';
import RadioGroup, {
  RadioGroupOption,
} from '../../../components/radiogroup/radiogroup';
import { SlideAnimation } from '../../slide-animation.enum';

export interface SettingsProps {
  selectedTheme: string;
  selectedAnimation: string;
  onThemeChange: (theme: Theme) => void;
  onAnimationChange: (animation: SlideAnimation) => void;
}

export default function Settings({
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
      <h2 className={styles.settingsHeader}>What do you think of the site?</h2>
      <h3>Doesn't look good?</h3>
      <div>
        <p>
          You can change certain things with the site to suit your liking. Such
          as...
        </p>
        {themingSelect}
        {animationSelect}
      </div>
    </>
  );
}

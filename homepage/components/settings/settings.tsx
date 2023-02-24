import styles from './settings.module.scss';

import { Theme } from '../../theme.enum';
import RadioGroup, {
  RadioGroupOption,
} from '../../../components/radiogroup/radiogroup';

export interface SettingsProps {
  selectedOption: string;
  onThemeChange: (theme: Theme) => void;
}

export default function Settings({
  selectedOption,
  onThemeChange,
}: SettingsProps): JSX.Element {
  const themes = Object.entries(Theme);

  const themingOptions: Array<RadioGroupOption> = themes.map((theme) => ({
    key: theme[1],
    label: theme[1],
    value: theme[0],
  }));

  const themingSelect = (
    <RadioGroup
      legend="Theming"
      name="theming"
      options={themingOptions}
      selectedOption={selectedOption}
      onSelect={(themeKey) => onThemeChange(Theme[themeKey])}
    />
  );

  return (
    <>
      <h2>What do you think of the site?</h2>
      <h3>Doesn't look good?</h3>
      <div>
        <p>You have much more power over the site than you think. Such as...</p>
        {themingSelect}
      </div>
    </>
  );
}

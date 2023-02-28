import styles from './settings.module.scss';

import RadioGroup, {
  RadioGroupOption,
} from '../../../components/radiogroup/radiogroup';
import { SettingsConfig } from '../../homepage.config';
import { Font, SlideAnimation, Theme } from '../../../config';

export interface SettingsProps {
  config: SettingsConfig;
  selectedFont: string;
  selectedTheme: string;
  selectedAnimation: string;
  onFontChange: (font: Font) => void;
  onThemeChange: (theme: Theme) => void;
  onAnimationChange: (animation: SlideAnimation) => void;
}

interface SettingsSection {
  enumeratedType: { [key: string]: string };
  legend: string;
  selectedValue: string;
  onChange: (value: string) => void;
}

export default function Settings({
  config,
  selectedFont,
  selectedTheme,
  selectedAnimation,
  onFontChange,
  onThemeChange,
  onAnimationChange,
}: SettingsProps): JSX.Element {
  const sections: Array<SettingsSection> = [
    {
      enumeratedType: Font,
      legend: 'Font',
      selectedValue: selectedFont,
      onChange: onFontChange,
    },
    {
      enumeratedType: Theme,
      legend: 'Theming',
      selectedValue: selectedTheme,
      onChange: onThemeChange,
    },
    {
      enumeratedType: SlideAnimation,
      legend: 'Animation',
      selectedValue: selectedAnimation,
      onChange: onAnimationChange,
    },
  ];

  const selects = sections.map(
    ({ enumeratedType, legend, selectedValue, onChange }) => {
      const values = Object.entries(enumeratedType);

      const options: Array<RadioGroupOption> = values.map((value) => ({
        key: value[1],
        label: value[1],
        value: value[0],
      }));

      return (
        <RadioGroup
          className={styles.selectGroup}
          legend={legend}
          name={legend.toLowerCase()}
          key={legend.toLowerCase()}
          options={options}
          selectedOption={selectedValue}
          onSelect={(key) => onChange(enumeratedType[key])}
        />
      );
    }
  );

  return (
    <>
      <h2 className={styles.settingsHeader}>{config.textContent.header}</h2>
      <h3>{config.textContent.subheader}</h3>
      <div>
        <p>{config.textContent.prompt}</p>
        {selects}
      </div>
    </>
  );
}

import styles from './settings.module.scss';

import RadioGroup, { RadioGroupOption } from '../radiogroup/radiogroup';
import { Font } from '../../config/font.enum';
import { SlideAnimation } from '../../config/slide-animation.enum';
import { Theme } from '../../config/theme.enum';
import { createLinkElement } from '../../config/link.model';
import { SettingsConfig } from '../../config/settings.config';

export interface SettingsProps {
  config: SettingsConfig;
  font: string;
  theme: string;
  animation: string;
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
  font,
  theme,
  animation,
  onFontChange,
  onThemeChange,
  onAnimationChange,
}: SettingsProps): JSX.Element {
  const sections: Array<SettingsSection> = [
    {
      enumeratedType: Font,
      legend: 'Font',
      selectedValue: font,
      onChange: onFontChange,
    },
    {
      enumeratedType: Theme,
      legend: 'Theming',
      selectedValue: theme,
      onChange: onThemeChange,
    },
    {
      enumeratedType: SlideAnimation,
      legend: 'Animation',
      selectedValue: animation,
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

      let marqueeExplanation: JSX.Element;

      if (legend === 'Animation' && animation === SlideAnimation.MARQUEE) {
        marqueeExplanation = (
          <span
            className={styles.marqueeExplanation}
            dangerouslySetInnerHTML={{
              __html: createLinkElement(config.textContent.marqueeExplanation),
            }}
          />
        );
      }

      return (
        <div className={styles.selectGroup} key={legend.toLowerCase()}>
          <RadioGroup
            legend={legend}
            name={legend.toLowerCase()}
            options={options}
            selectedOption={selectedValue}
            onSelect={(key) => onChange(enumeratedType[key])}
          />
          {marqueeExplanation}
        </div>
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

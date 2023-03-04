import styles from './settings.module.scss';

import RadioGroup, { RadioGroupOption } from '../radiogroup/radiogroup';
import { Font } from '../../config/font.enum';
import { SlideAnimation } from '../../config/slide-animation.enum';
import { Theme } from '../../config/theme.enum';
import { createLinkElement } from '../../config/link.model';
import { SettingsConfig } from '../../config/settings.config';
import UnitTestCheck from '../unit-test-check/unit-test-check';
import Switch from '../switch/switch';

export interface SettingsProps {
  config: SettingsConfig;
  font: string;
  theme: string;
  animation: string;
  developerMode: boolean;
  onFontChange: (font: Font) => void;
  onThemeChange: (theme: Theme) => void;
  onAnimationChange: (animation: SlideAnimation) => void;
  onDeveloperModeChange: (developerMode: boolean) => void;
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
  developerMode,
  onFontChange,
  onThemeChange,
  onAnimationChange,
  onDeveloperModeChange,
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

      let settingExplanation: JSX.Element;
      let explanationHtmlString: string;

      if ((explanationHtmlString = setExplanation(legend, selectedValue))) {
        settingExplanation = (
          <span
            className={styles.settingExplanation}
            dangerouslySetInnerHTML={{
              __html: explanationHtmlString,
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
          {settingExplanation}
        </div>
      );
    }
  );

  return (
    <>
      <UnitTestCheck componentName="Settings" />
      <h2 className={styles.settingsHeader}>{config.textContent.header}</h2>
      <h3>{config.textContent.subheader}</h3>
      <div className={styles.settingsContainer}>
        <p>{config.textContent.prompt}</p>
        {selects}
        <p className={styles.developerMode}>
          {config.textContent.explanation.developerMode}
          <Switch
            className={styles.developerModeSwitch}
            value={developerMode}
            onChange={onDeveloperModeChange}
          />
        </p>
      </div>
    </>
  );

  function setExplanation(
    legend: string,
    selectedValue: string
  ): string | undefined {
    if (legend === 'Animation') {
      if (selectedValue === SlideAnimation.MARQUEE) {
        return createLinkElement(config.textContent.explanation.marquee);
      }
    } else if (legend === 'Font') {
      if (selectedValue === Font.TILT_PRISM) {
        return createLinkElement(config.textContent.explanation.tiltPrism);
      }
    }

    return undefined;
  }
}

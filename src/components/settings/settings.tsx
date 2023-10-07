import styles from './settings.module.scss';

import Link from 'next/link';

import RadioGroup, { RadioGroupOption } from '../radiogroup/radiogroup';
import UnitTestCheck from '../unit-test-check/unit-test-check';
import Switch from '../switch/switch';
import { locales } from '../../page-utils/locales.config';
import SettingsProps from './models/settings-props.interface';
import SettingsSection from './models/settings-section.interface';
import Font from '../../models/font.enum';
import Theme from '../../models/theme.enum';
import SlideAnimation from '../../models/slide-animation.enum';
import createLinkElement from '../../config/create-link-element.function';

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

  route = '',
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
        <div className={styles.localizedSites}>
          <label className={styles.localizedSitesHeader}>Language</label>
          {locales.map((locale) => (
            <Link
              className={styles.localizedSite}
              key={locale.code}
              href={`/${locale.code}${route}`}
              prefetch={false}
            >
              {locale.displayName}
            </Link>
          ))}
          <p
            className={styles.languageExplanation}
            dangerouslySetInnerHTML={{
              __html: createLinkElement(
                config.textContent.explanation.translation
              ),
            }}
          />
        </div>
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
      switch (selectedValue) {
        case Font.TILT_PRISM:
          return createLinkElement(config.textContent.explanation.tiltPrism);
        case Font.EATER:
          return createLinkElement(config.textContent.explanation.eater);
      }
    }

    return undefined;
  }
}

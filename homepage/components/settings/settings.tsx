import styles from './settings.module.scss';

import { Theme } from '../../theme.enum';

export interface SettingsProps {
  onThemeChange: (theme: Theme) => void;
}

export default function Settings({
  onThemeChange,
}: SettingsProps): JSX.Element {
  const themes = Object.entries(Theme);

  const themeOptions = themes.map((theme) => (
    <option value={theme[0]} key={theme[1]}>
      {theme[1]}
    </option>
  ));

  const themingSelect = (
    <>
      <label htmlFor="theming-select">Theming</label>...
      <select
        id="theming-select"
        className={styles.selectTheme}
        onInput={(event) => onThemeChange(Theme[event.currentTarget.value])}
      >
        {themeOptions}
      </select>
    </>
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

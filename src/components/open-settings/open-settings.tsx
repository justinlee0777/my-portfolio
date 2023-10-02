import styles from './open-settings.module.scss';

import classNames from 'classnames';
import { useState } from 'react';

import Settings from '../settings/settings';
import UnitTestCheck from '../unit-test-check/unit-test-check';
import OpenSettingsConfig from './models/open-settings-config.interface';
import SettingsProps from '../settings/models/settings-props.interface';

export interface OpenSettingsProps extends Omit<SettingsProps, 'config'> {
  config: OpenSettingsConfig;

  className?: string;
}

export default function OpenSettings({
  className,
  config,
  ...settingsProps
}: OpenSettingsProps): JSX.Element {
  const [opened, setOpened] = useState(false);

  const menuClassName = classNames(styles.menu, className, {
    [styles.menuOpened]: opened,
  });

  return (
    <div className={menuClassName}>
      <UnitTestCheck componentName="OpenSettings" />
      <button
        className={styles.menuIcon}
        aria-label={
          opened ? config.aria.collapseLabel : config.aria.expandLabel
        }
        aria-pressed={opened}
        aria-expanded={opened}
        onClick={() => setOpened(!opened)}
      >
        <div className={styles.menuTriangle}></div>
        <div className={styles.menuLine}></div>
      </button>
      <div className={styles.settings} tabIndex={Number(opened) - 1}>
        <Settings {...settingsProps} config={config.settings} />
      </div>
    </div>
  );
}

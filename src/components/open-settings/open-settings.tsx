import styles from './open-settings.module.scss';

import classNames from 'classnames';
import { useState, type JSX } from 'react';

import Settings from '../settings/settings';
import UnitTestCheck from '../unit-test-check/unit-test-check';
import OpenSettingsProps from './open-settings-props.interface';

export default function OpenSettings({
  className,
  route,
  config,
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
        <Settings route={route} config={config.settings} />
      </div>
    </div>
  );
}

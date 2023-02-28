import styles from './open-settings.module.scss';

import classNames from 'classnames';
import { useState } from 'react';

import Settings, { SettingsProps } from '../settings/settings';
import { OpenSettingsConfig } from '../../config/open-settings.config';

export interface OpenSettingsProps extends Omit<SettingsProps, 'config'> {
  config: OpenSettingsConfig;

  className?: string;
}

export default function OpenSettings({
  className,
  ...settingsProps
}: OpenSettingsProps): JSX.Element {
  const [opened, setOpened] = useState(false);

  const menuClassName = classNames(styles.menu, className, {
    [styles.menuOpened]: opened,
  });

  return (
    <div className={menuClassName}>
      <button className={styles.menuIcon} onClick={() => setOpened(!opened)}>
        <div className={styles.menuTriangle}></div>
        <div className={styles.menuLine}></div>
      </button>
      <div className={styles.settings}>
        <Settings {...settingsProps} config={settingsProps.config.settings} />
      </div>
    </div>
  );
}

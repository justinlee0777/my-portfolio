import styles from './switch.module.scss';

import classNames from 'classnames';
import { type JSX } from 'react';

import UnitTestCheck from '../unit-test-check/unit-test-check';
import SwitchProps from './switch-props.interface';

export default function Switch({
  className,
  value,
  onChange,
}: SwitchProps): JSX.Element {
  const onClick = () => onChange?.(!value);

  const switchClassName = classNames(styles.switch, className, {
    [styles.switchActive]: value,
  });

  return (
    <button
      className={switchClassName}
      onClick={onClick}
      role="switch"
      aria-checked={value}
      aria-label="Click to toggle."
    >
      <UnitTestCheck componentName="Switch" />
      <div
        className={styles.switchKnob}
        role="button"
        aria-label="Click to toggle."
        onClick={onClick}
      ></div>
    </button>
  );
}

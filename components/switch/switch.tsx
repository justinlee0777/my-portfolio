import styles from './switch.module.scss';

import classNames from 'classnames';

export interface SwitchProps {
  className?: string;
  value?: boolean;
  onChange?: (toggled: boolean) => void;
}

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
      <div
        className={styles.switchKnob}
        role="button"
        aria-label="Click to toggle."
        onClick={onClick}
      ></div>
    </button>
  );
}

import styles from './radiogroup.module.scss';

import { useState } from 'react';

export interface RadioGroupOption {
  key: string;
  label: string;
  value: string;
}

export interface RadioGroupProps {
  className: string;
  legend: string;
  name: string;
  options: Array<RadioGroupOption>;
  selectedOption: string;
  onSelect: (value: string) => void;
}

export default function RadioGroup({
  className,
  legend,
  name,
  options,
  selectedOption,
  onSelect,
}: RadioGroupProps): JSX.Element {
  const [opened, setOpened] = useState(false);

  let radioOptions: Array<JSX.Element>;

  let radioGroupClassName = styles.radioGroup;
  let expandClassName = styles.expand;

  if (opened) {
    radioOptions = options.map((option) => (
      <div key={option.key} style={{ display: 'inline-block' }}>
        <input
          type="radio"
          id={option.key}
          name={name}
          value={option.value}
          checked={option.key === selectedOption}
          onChange={() => onSelect(option.value)}
        />
        <label htmlFor={option.key}>{option.label}</label>
      </div>
    ));
  } else {
    radioGroupClassName = `${radioGroupClassName} ${styles.radioGroupUnopened}`;
    expandClassName = `${expandClassName} ${styles.expandUnactivated}`;
  }

  return (
    <div className={`${styles.radioGroupContainer} ${className}`}>
      <fieldset className={radioGroupClassName}>
        <legend>{legend}</legend>
        {radioOptions}
      </fieldset>
      <button
        className={expandClassName}
        onClick={() => setOpened(!opened)}
        aria-label={`Open ${legend.toLowerCase()} settings`}
      >
        +
      </button>
    </div>
  );
}

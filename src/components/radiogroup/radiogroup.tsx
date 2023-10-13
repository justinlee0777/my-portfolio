import styles from './radiogroup.module.scss';

import FieldSet from '../fieldset/fieldset';
import UnitTestCheck from '../unit-test-check/unit-test-check';
import RadioGroupProps from './radio-group-props.interface';

export default function RadioGroup({
  className,
  legend,
  name,
  options,
  selectedOption,
  onSelect,
}: RadioGroupProps): JSX.Element {
  return (
    <FieldSet className={className} legend={legend}>
      <>
        <UnitTestCheck componentName="RadioGroup" />
        {options.map((option) => (
          <div key={option.key} className={styles.radio}>
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
        ))}
      </>
    </FieldSet>
  );
}

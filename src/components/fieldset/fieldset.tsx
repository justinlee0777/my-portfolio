import styles from './fieldset.module.scss';

import classNames from 'classnames';
import { useState } from 'react';
import UnitTestCheck from '../unit-test-check/unit-test-check';

export interface FieldSetProps {
  id?: string;
  className?: string;
  children?: JSX.Element;
  animated?: 'activated' | 'unactivated';
  legend: string;
}

export default function FieldSet({
  id,
  className,
  children,
  animated,
  legend,
}: FieldSetProps): JSX.Element {
  const [opened, setOpened] = useState(false);

  let fieldsetClassName = styles.fieldset;
  let expandClassName = styles.expand;

  if (!opened) {
    fieldsetClassName = `${fieldsetClassName} ${styles.fieldsetUnopened}`;
    expandClassName = `${expandClassName} ${styles.expandUnactivated}`;
  }

  const fieldsetContainerClassNames = classNames(
    styles.fieldsetContainer,
    className
  );

  return (
    <div
      id={id}
      className={fieldsetContainerClassNames}
      data-animatable={animated}
    >
      <UnitTestCheck componentName="FieldSet" />
      <fieldset className={fieldsetClassName}>
        <legend>{legend}</legend>
        {opened && children}
      </fieldset>
      <button
        className={expandClassName}
        aria-pressed={opened}
        aria-expanded={opened}
        onClick={() => setOpened(!opened)}
        aria-label={`Open ${legend.toLowerCase()} settings`}
      >
        +
      </button>
    </div>
  );
}

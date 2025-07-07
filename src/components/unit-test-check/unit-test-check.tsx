import styles from './unit-test-check.module.scss';

import classNames from 'classnames';
import { useState, type JSX } from 'react';

import UnitTestContext from '../../contexts/unit-test/unit-test.context';
import UnitTestCheckProps from './unit-test-check-props.interface';

export default function UnitTestCheck({
  componentName,
  style,
}: UnitTestCheckProps): JSX.Element {
  const [tooltipOpened, setTooltipOpened] = useState(false);

  const checkmark = String.fromCharCode(10003);
  const fail = String.fromCharCode(215);

  const tooltipClassNames = classNames(styles.tooltip, {
    [styles.tooltipOpened]: tooltipOpened,
  });

  return (
    <UnitTestContext.Consumer>
      {({ results, developerMode }) => {
        const unitTests = results[componentName];

        if (!(developerMode && unitTests)) {
          return <></>;
        }

        return (
          <div className={styles.container} style={style}>
            <button
              aria-label="Click to see the unit test results for this component."
              aria-pressed={tooltipOpened}
              aria-expanded={tooltipOpened}
              className={styles.icon}
              onClick={() => setTooltipOpened(!tooltipOpened)}
            >
              {checkmark}
            </button>
            <div className={tooltipClassNames} role="tooltip">
              <p
                className={styles.tooltipTitle}
              >{`<${componentName}/> unit tests`}</p>
              {unitTests.tests.map((unitTest, i) => (
                <p key={i}>
                  {unitTest.testName}
                  {unitTest.passed ? checkmark : fail}
                </p>
              ))}
            </div>
          </div>
        );
      }}
    </UnitTestContext.Consumer>
  );
}

import styles from './unit-test-check.module.scss';

import { useState } from 'react';
import classNames from 'classnames';

import { UnitTestContext } from '../../contexts/unit-test.context';

export interface UnitTestProps {
  componentName: string;
}

export default function UnitTestCheck({
  componentName,
}: UnitTestProps): JSX.Element {
  const [tooltipOpened, setTooltipOpened] = useState(false);

  const checkmark = String.fromCharCode(10003);
  const fail = String.fromCharCode(215);

  const tooltipClassNames = classNames(styles.tooltip, {
    [styles.tooltipOpened]: tooltipOpened,
  });

  return (
    <UnitTestContext.Consumer>
      {(unitTestResult) => {
        const unitTests = unitTestResult[componentName];

        return (
          <div className={styles.container}>
            <button
              aria-pressed={tooltipOpened}
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

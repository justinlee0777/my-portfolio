import styles from './unit-test-check.module.scss';

import { CSSProperties, useState } from 'react';
import classNames from 'classnames';

import { UnitTestContext } from '../../contexts/unit-test.context';

export interface UnitTestProps {
  componentName: string;
  style?: CSSProperties;
}

export default function UnitTestCheck({
  componentName,
  style,
}: UnitTestProps): JSX.Element {
  const [tooltipOpened, setTooltipOpened] = useState(false);

  const checkmark = String.fromCharCode(10003);
  const fail = String.fromCharCode(215);

  const tooltipClassNames = classNames(styles.tooltip, {
    [styles.tooltipOpened]: tooltipOpened,
  });

  return (
    <UnitTestContext.Consumer>
      {({ results, developerMode }) => {
        if (!developerMode) {
          return <></>;
        }

        const unitTests = results[componentName];

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

import UnitTestResult from './unit-test-result.model';

export interface UnitTestResults {
  [componentName: string]: {
    numFailingTests: number;
    numPassingTests: number;
    tests: Array<UnitTestResult>;
  };
}

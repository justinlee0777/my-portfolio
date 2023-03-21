import { createContext } from 'react';

export interface UnitTestResult {
  testName: string;
  passed: boolean;
}

export interface UnitTestResults {
  [componentName: string]: {
    numFailingTests: number;
    numPassingTests: number;
    tests: Array<UnitTestResult>;
  };
}

export interface UnitTestContextData {
  results: UnitTestResults;
  developerMode: boolean;
}

export const UnitTestContext = createContext<UnitTestContextData>({
  results: {},
  developerMode: false,
});

import { readFileSync } from 'fs';

import { UnitTestResults } from '../contexts/unit-test/unit-test-results.model';

export function loadUnitTestResult(): UnitTestResults {
  const json = readFileSync('public/unit-test-results.json');

  return JSON.parse(json.toString());
}

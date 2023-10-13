import { UnitTestResults } from './unit-test-results.model';

export default interface UnitTestContextData {
  results: UnitTestResults;
  developerMode: boolean;
}

import { createContext } from 'react';

import UnitTestContextData from './unit-test-context-data.model';

const UnitTestContext = createContext<UnitTestContextData>({
  results: {},
  developerMode: false,
});

export default UnitTestContext;

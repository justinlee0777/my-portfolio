import { useCallback, useMemo } from 'react';

import { useApi } from '../utils/hooks/use-api.hook';
import { getCompanySpecificCoverLetter } from './cover-letter.api';

export function useCompanySpecificResponse(
  apiUrl: string,
  companyId?: string
): [string, string, Promise<[string, string]>] {
  const [companySpecificCover, error] = useApi(() =>
    getCompanySpecificCoverLetter(apiUrl, companyId)
  );

  let fn: (value: [string, string]) => void;
  const waitForCompanySpecificResponse = useMemo(
    () => new Promise<[string, string]>((resolve) => (fn = resolve)),
    []
  );
  const resolveCompanyResponse = useCallback(fn, []);

  if (companySpecificCover || error) {
    resolveCompanyResponse([companySpecificCover, error]);
  }

  return [companySpecificCover, error, waitForCompanySpecificResponse];
}

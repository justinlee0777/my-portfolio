import { useEffect, useState } from 'react';

/**
 * @returns 2-tuple: [ Data, ErrorMessage ]
 */
export function useApi<T>(get: () => Promise<T>): [T | null, string | null] {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    get()
      .then(setData)
      .catch((error) => setError(error.message));
  }, []);

  return [data, error];
}

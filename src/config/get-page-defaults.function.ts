import { PageConfig } from './page.config';

/*
 * SessionStorage will be used as the settings do not need to persist across storage.
 * Not all too interested in saddling too much data on the user.
 */

const storageKey = 'app-settings';

export function getPageDefaults(): PageConfig | undefined {
  const stringifiedObject = sessionStorage.getItem(storageKey);

  try {
    return JSON.parse(stringifiedObject);
  } catch {
    return undefined;
  }
}

export function setPageDefaults(pageConfig: PageConfig): void {
  sessionStorage.setItem(storageKey, JSON.stringify(pageConfig));
}

import { getStorage } from '../utils/get-storage.function';
import { PageConfig } from './page.config';

const storageKey = 'app-settings';

export function getPageDefaults(): PageConfig | undefined {
  const stringifiedObject = getStorage().getItem(storageKey);

  try {
    return JSON.parse(stringifiedObject);
  } catch {
    return undefined;
  }
}

export function setPageDefaults(pageConfig: PageConfig): void {
  getStorage().setItem(storageKey, JSON.stringify(pageConfig));
}

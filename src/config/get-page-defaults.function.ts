import PageConfig from '../models/page-config.model';
import { getStorage } from '../utils/get-storage.function';

const storageKey = 'app-settings';

export function getPageDefaults(): PageConfig['defaults'] | undefined {
  const stringifiedObject = getStorage().getItem(storageKey);

  try {
    return JSON.parse(stringifiedObject!);
  } catch {
    return undefined;
  }
}

export function setPageDefaults(pageDefaults: PageConfig['defaults']): void {
  getStorage().setItem(storageKey, JSON.stringify(pageDefaults));
}

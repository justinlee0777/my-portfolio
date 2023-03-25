import { getStorage } from '../../utils/get-storage.function';
import { RandomType } from '../random-of-the-day.config';

export interface SavedRandomOfTheDayConfig {
  sections: Array<RandomType>;
  showControls: boolean;
}

const storageKey = 'random-of-the-day-config';

export function getRandomOfTheDayConfig():
  | SavedRandomOfTheDayConfig
  | undefined {
  const stringifiedObject = getStorage().getItem(storageKey);

  try {
    return JSON.parse(stringifiedObject);
  } catch {
    return undefined;
  }
}

export function setRandomOfTheDayConfig(
  config: SavedRandomOfTheDayConfig
): void {
  getStorage().setItem(storageKey, JSON.stringify(config));
}

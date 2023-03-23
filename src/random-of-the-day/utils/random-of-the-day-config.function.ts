import { getStorage } from '../../utils/get-storage.function';
import { RandomType } from '../random-of-the-day.config';

const storageKey = 'random-of-the-day-config';

export function getRandomOfTheDayConfig(): Array<RandomType> | undefined {
  const stringifiedObject = getStorage().getItem(storageKey);

  try {
    return JSON.parse(stringifiedObject);
  } catch {
    return undefined;
  }
}

export function setRandomOfTheDayConfig(config: Array<RandomType>): void {
  getStorage().setItem(storageKey, JSON.stringify(config));
}

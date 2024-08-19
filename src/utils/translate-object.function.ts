import cloneDeep from 'lodash-es/cloneDeep';
import get from 'lodash-es/get';
import set from 'lodash-es/set';

import translate from '../api/google/translate.function';
import { decodeHTMLEntities } from './decode-html-entities.function';

/**
 * @param keysToTranslate strings can be in the format used by lodash.get.
 * @throws if a key in keysToTranslate does not need to a string.
 */
export async function translateObject<T = Object>(
  object: T,
  keysToTranslate: Array<string>,
  targetLanguage: string
): Promise<T> {
  let stringsToTranslate: Array<string>;

  [keysToTranslate, stringsToTranslate] = keysToTranslate.reduce(
    (filteredValues, keyString) => {
      const keys = keyString.split('.');

      const stringToTranslate = get(object, keys);

      if (typeof stringToTranslate !== 'string') {
        throw new Error(
          `Path passed to 'translateObject' does not lead to a string. Path: ${keyString} Retrieved value: ${stringToTranslate}`
        );
      } else if (stringToTranslate.length !== 0) {
        return [
          filteredValues[0].concat(keyString),
          filteredValues[1].concat(stringToTranslate),
        ];
      }

      return filteredValues;
    },
    [[], []]
  );

  const translatedStrings = await translate(stringsToTranslate, targetLanguage);

  const translatedObj = cloneDeep(object);

  keysToTranslate.forEach((keyString, i) => {
    const keys = keyString.split('.');
    const decodedTranslatedString = decodeHTMLEntities(translatedStrings[i]);

    set(translatedObj, keys, decodedTranslatedString);
  });

  return translatedObj;
}

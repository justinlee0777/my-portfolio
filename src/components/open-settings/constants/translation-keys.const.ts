import getSettingsTranslationKeys from '../../settings/constants/translation-keys.const';

const keysToTranslate = ['aria.expandLabel', 'aria.collapseLabel'];

export default function getTranslationKeys(): Array<string> {
  return [
    ...getSettingsTranslationKeys().map((key) => `settings.${key}`),
    ...keysToTranslate,
  ];
}

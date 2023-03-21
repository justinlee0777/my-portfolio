export interface RpgGameConfig {
  textContent: {
    header: string;
    subheader: string;
    outOfFocusMessage: string;
  };
  iframeUrl: string;
}

const keysToTranslate = [
  'textContent.header',
  'textContent.subheader',
  'textContent.outOfFocusMessage',
];

export function getTranslationKeys(): Array<string> {
  return keysToTranslate;
}

const explanationKeys = [
  'translation.templateString',
  'marquee.templateString',
  'tiltPrism.templateString',
  'eater.templateString',
  'developerMode',
].map((key) => `explanation.${key}`);

const keysToTranslate = [
  'header',
  'subheader',
  'prompt',
  ...explanationKeys,
].map((key) => `textContent.${key}`);

export default function getTranslationKeys(): Array<string> {
  return keysToTranslate;
}

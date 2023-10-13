import RandomOfTheDayConfig from '../models/random-of-the-day-config.interface';

const keysToTranslate = [
  ...[
    'header',
    'hideControls',
    'showControls',
    'poemOfTheDay.header',
    ...['header', 'credit'].map((key) => `factOfTheDay.${key}`),
    ...['header', 'credit', 'openHighResImage', 'highResImageLoadFailed'].map(
      (key) => `paintingOfTheDay.${key}`
    ),
    'obliqueStrategyOfTheDay.header',
    'obliqueStrategyOfTheDay.explanation.templateString',
  ].map((key) => `textContent.${key}`),
];

export function getTranslationKeys(
  config: RandomOfTheDayConfig
): Array<string> {
  return [
    ...keysToTranslate,
    ...config.textContent.description.map(
      (_, i) => `textContent.description.${i}`
    ),
    ...config.textContent.randoms.map(
      (_, i) => `textContent.randoms.${i}.text`
    ),
  ];
}

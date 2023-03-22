export interface RandomOfTheDayConfig {
  seo: {
    title: string;
    description: string;
  };
  textContent: {
    header: string;
    description: Array<string>;
    poemOfTheDay: {
      header: string;
    };
  };
}

const keysToTranslate = [
  ...['header', 'poemOfTheDay.header'].map((key) => `textContent.${key}`),
];

export function getTranslationKeys(
  config: RandomOfTheDayConfig
): Array<string> {
  return [
    ...keysToTranslate,
    ...config.textContent.description.map(
      (_, i) => `textContent.description.${i}`
    ),
  ];
}

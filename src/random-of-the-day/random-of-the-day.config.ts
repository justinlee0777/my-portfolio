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
    factOfTheDay: {
      header: string;
      /**
       * This can be a regular string or a string with the token symbol ${API_URL}, to replace with the proper source and link to the proper source. This should pose no trouble for the translation, I believe, as it will treat it as a noun
       */
      credit: string;
    };
  };
}

const keysToTranslate = [
  ...[
    'header',
    'poemOfTheDay.header',
    ...['header', 'credit'].map((key) => `factOfTheDay.${key}`),
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
  ];
}

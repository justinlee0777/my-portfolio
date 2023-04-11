import { Link } from '../config/link.model';

export enum RandomType {
  POEM = 'poem',
  FACT = 'fact',
  PAINTING = 'painting',
  OBLIQUE_STRATEGY = 'oblique strategy',
}

export interface RandomThing {
  text: string;
  type: RandomType;
}

export interface RandomOfTheDayConfig {
  seo: {
    title: string;
    description: string;
  };
  textContent: {
    header: string;
    description: Array<string>;
    hideControls: string;
    showControls: string;
    randoms: Array<RandomThing>;
    poemOfTheDay: {
      header: string;
    };
    factOfTheDay: {
      header: string;
      /**
       * This can be a regular string or a string with the token symbol ${API_URL}, to replace with the proper source and link to the proper source.
       * This should pose no trouble for the translation, I believe, as it will treat it as a noun
       */
      credit: string;
    };
    paintingOfTheDay: {
      header: string;
      /**
       * This can be a regular string or a string with the token symbol ${API_URL}, to replace with the proper source and link to the proper source.
       * This should pose no trouble for the translation, I believe, as it will treat it as a noun
       */
      credit: string;
      openHighResImage: string;
      highResImageLoadFailed: string;
    };
    obliqueStrategyOfTheDay: {
      header: string;
      explanation: Link;
    };
  };
}

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

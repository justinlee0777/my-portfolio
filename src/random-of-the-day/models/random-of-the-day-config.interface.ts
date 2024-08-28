import LinkedString from '../../models/linked-string.model';
import RandomThing from './random-thing.interface';

export default interface RandomOfTheDayConfig {
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
      explanation: LinkedString;
    };
    frogSoundOfTheDay: {
      header: string;
    };
  };
}

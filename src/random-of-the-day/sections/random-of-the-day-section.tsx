import { Modal } from '../../services/modal';
import RandomOfTheDayConfig from '../models/random-of-the-day-config.interface';
import RandomType from '../models/random-type.enum';
import { BaseSectionProps } from './base-section.props';
import RandomFactOfTheDay from './random-fact-of-the-day/random-fact-of-the-day';
import RandomFrogSoundOfTheDay from './random-frog-sound-of-the-day/random-frog-sound-of-the-day';
import RandomObliqueStrategyOfTheDay from './random-oblique-strategy-of-the-day/random-oblique-strategy-of-the-day';
import RandomPaintingOfTheDay from './random-painting-of-the-day/random-painting-of-the-day';
import RandomPoemOfTheDay from './random-poem-of-the-day/random-poem-of-the-day';

export interface RandomOfTheDaySectionProps
  extends Pick<BaseSectionProps, 'animated'> {
  modal: Modal;

  random: RandomType;
  createId: (random: RandomType) => string;
  apiUrl: string;
  config: RandomOfTheDayConfig;
}

export default function RandomOfTheDaySection({
  modal,
  animated,
  random,
  createId,
  apiUrl,
  config,
}: RandomOfTheDaySectionProps): JSX.Element {
  const elementId = createId(random);

  switch (random) {
    case RandomType.POEM:
      return (
        <RandomPoemOfTheDay
          id={elementId}
          animated={animated}
          header={config.textContent.poemOfTheDay.header}
          randomOfTheDayApiUrl={apiUrl}
        />
      );
    case RandomType.FACT:
      return (
        <RandomFactOfTheDay
          id={elementId}
          animated={animated}
          {...config.textContent.factOfTheDay}
          randomOfTheDayApiUrl={apiUrl}
        />
      );
    case RandomType.PAINTING:
      return (
        <RandomPaintingOfTheDay
          id={elementId}
          modal={modal}
          animated={animated}
          {...config.textContent.paintingOfTheDay}
          randomOfTheDayApiUrl={apiUrl}
        />
      );
    case RandomType.OBLIQUE_STRATEGY:
      return (
        <RandomObliqueStrategyOfTheDay
          id={elementId}
          animated={animated}
          {...config.textContent.obliqueStrategyOfTheDay}
          randomOfTheDayApiUrl={apiUrl}
        />
      );
    case RandomType.FROG_SOUND:
      return (
        <RandomFrogSoundOfTheDay
          id={elementId}
          animated={animated}
          {...config.textContent.frogSoundOfTheDay}
        />
      );
  }
}

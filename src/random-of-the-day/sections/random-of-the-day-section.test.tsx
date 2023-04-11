let props;

jest.mock(
  './random-fact-of-the-day/random-fact-of-the-day',
  () => (componentProps) => {
    props = componentProps;
    return <p>fact</p>;
  }
);

jest.mock(
  './random-oblique-strategy-of-the-day/random-oblique-strategy-of-the-day',
  () => (componentProps) => {
    props = componentProps;
    return <p>Strategy</p>;
  }
);

jest.mock(
  './random-painting-of-the-day/random-painting-of-the-day',
  () => (componentProps) => {
    props = componentProps;
    return <p>painting</p>;
  }
);

jest.mock(
  './random-poem-of-the-day/random-poem-of-the-day',
  () => (componentProps) => {
    props = componentProps;
    return <p>Poem</p>;
  }
);

import { RenderResult, cleanup, render, waitFor } from '@testing-library/react';
import RandomOfTheDaySection from './random-of-the-day-section';
import { Modal } from '../../services/modal';
import { RandomOfTheDayConfig, RandomType } from '../random-of-the-day.config';

describe('<RandomOfTheDaySection/>', () => {
  let renderResult: RenderResult;
  let modal: Modal;

  const poemConfig: RandomOfTheDayConfig['textContent']['poemOfTheDay'] = {
    header: 'Poem of the day',
  };

  const factConfig: RandomOfTheDayConfig['textContent']['factOfTheDay'] = {
    header: 'Fact of the day',
    credit: 'uselessfacts',
  };

  const paintingConfig: RandomOfTheDayConfig['textContent']['paintingOfTheDay'] =
    {
      header: 'Paitninf od the day',
      credit: 'Metropolitan museum',
      openHighResImage: 'open',
      highResImageLoadFailed: 'Image load failed',
    };

  const obliqueStrategyConfig: RandomOfTheDayConfig['textContent']['obliqueStrategyOfTheDay'] =
    {
      header: 'Strategy of the day',
      explanation: {
        templateString: '',
        urls: [],
      },
    };

  const config: RandomOfTheDayConfig = {
    textContent: {
      poemOfTheDay: poemConfig,
      factOfTheDay: factConfig,
      paintingOfTheDay: paintingConfig,
      obliqueStrategyOfTheDay: obliqueStrategyConfig,
    },
  } as any;

  async function renderComponent(random: RandomType) {
    modal = new Modal(jest.fn());

    renderResult = await waitFor(() =>
      render(
        <RandomOfTheDaySection
          random={random}
          modal={modal}
          apiUrl="http://api.example.com"
          config={config}
          createId={(random) => random}
        />
      )
    );
  }

  afterEach(() => {
    cleanup();
    jest.resetModules();
  });

  test('renders poem', async () => {
    await renderComponent(RandomType.POEM);

    const poem = renderResult.queryByText('Poem');
    expect(poem).toBeTruthy();

    expect(props.header).toBe('Poem of the day');
  });

  test('renders fact', async () => {
    await renderComponent(RandomType.FACT);

    const fact = renderResult.queryByText('fact');
    expect(fact).toBeTruthy();

    expect(props.header).toBe('Fact of the day');
    expect(props.credit).toBe('uselessfacts');
  });

  test('renders painting', async () => {
    await renderComponent(RandomType.PAINTING);

    const painting = renderResult.queryByText('painting');
    expect(painting).toBeTruthy();

    expect(props.header).toBe('Paitninf od the day');
    expect(props.credit).toBe('Metropolitan museum');
    expect(props.openHighResImage).toBe('open');
    expect(props.highResImageLoadFailed).toBe('Image load failed');
  });

  test('renders oblique strategy', async () => {
    await renderComponent(RandomType.OBLIQUE_STRATEGY);

    const strategy = renderResult.queryByText('Strategy');
    expect(strategy).toBeTruthy();

    expect(props.header).toBe('Strategy of the day');
    expect(props.explanation).toEqual({
      templateString: '',
      urls: [],
    });
  });
});

jest.mock('react-dom/server', () => {
  return {
    __esModule: true,
    renderToString: () => 'There was an error loading this resource',
  };
});

jest.mock('../../../components/loading-screen/loading-screen', () => () => {
  return <div>Loading...</div>;
});

const getObliqueStrategy = jest.fn();

jest.mock('../../api/get-oblique-strategy.function', () => getObliqueStrategy);

import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';

import RandomObliqueStrategyOfTheDay from './random-oblique-strategy-of-the-day';

describe('<RandomObliqueStrategyOfTheDay/>', () => {
  let renderResult: RenderResult;

  async function renderComponent() {
    renderResult = await waitFor(() =>
      render(
        <RandomObliqueStrategyOfTheDay
          header="Oblique strategy of the day"
          randomOfTheDayApiUrl="http://example.com"
          explanation={{
            templateString: 'Oblique strategies are cool.',
            urls: [],
          }}
        />
      )
    );
  }

  afterEach(() => {
    cleanup();
    jest.resetModules();
  });

  test('renders a loading screen', async () => {
    let resolve;
    const promise = new Promise((resolveFn) => (resolveFn = resolve));

    getObliqueStrategy.mockReturnValue(promise);

    await renderComponent();
    const loadingMessage = renderResult.queryByText('Loading...');
    expect(loadingMessage).toBeTruthy();
  });

  test('renders an error message', async () => {
    getObliqueStrategy.mockReturnValue(
      Promise.reject(new Error('Load failed.'))
    );

    await renderComponent();
    const errorMessage = await waitFor(() =>
      renderResult.findByText('Load failed.')
    );
    expect(errorMessage).toBeTruthy();
  });

  test('renders', async () => {
    getObliqueStrategy.mockReturnValue(
      Promise.resolve({
        content: 'The line is a line.',
      })
    );

    await renderComponent();

    const header = renderResult.queryByText('Oblique strategy of the day');
    expect(header).toBeTruthy();

    const strategyContent = renderResult.queryByText('The line is a line.');
    expect(strategyContent).toBeTruthy();

    const explanation = renderResult.queryByText(
      'Oblique strategies are cool.'
    );
    expect(explanation).toBeTruthy();
  });

  test('flips the card', async () => {
    getObliqueStrategy.mockReturnValue(
      Promise.resolve({
        content: 'The line is a line.',
      })
    );

    await renderComponent();

    let card = renderResult.queryByText('The line is a line.').parentElement;
    expect(card.className).toEqual('card');

    const cardBack = renderResult.queryByLabelText(
      'Clicking on this will activate an animation and expose the oblique strategy of the day.'
    );
    fireEvent.click(cardBack);

    card = renderResult.queryByText('The line is a line.').parentElement;
    expect(card.className).toEqual('card cardFlipped');
  });
});

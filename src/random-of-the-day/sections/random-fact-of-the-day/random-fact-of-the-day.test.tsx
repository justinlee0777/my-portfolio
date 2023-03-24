jest.mock('react-dom/server', () => {
  return {
    __esModule: true,
    renderToString: () => 'There was an error loading this resource',
  };
});

jest.mock('../../../components/loading-screen/loading-screen', () => () => {
  return <div>Loading...</div>;
});

const getFact = jest.fn();

jest.mock('../../random-of-the-day.api', () => {
  return {
    __esModule: true,
    getFact,
  };
});

import { cleanup, render, RenderResult, waitFor } from '@testing-library/react';

import RandomFactOfTheDay from './random-fact-of-the-day';

describe('<RandomFactOfTheDay/>', () => {
  let renderResult: RenderResult;

  async function renderComponent() {
    renderResult = await waitFor(() =>
      render(
        <RandomFactOfTheDay
          header="Fact of the day"
          credit="Credit goes to Mental Floss"
          randomOfTheDayApiUrl="http://example.com"
          linkedErrorMessage={{
            templateString: 'There was an error loading this resource',
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

    getFact.mockReturnValue(promise);

    await renderComponent();
    const loadingMessage = renderResult.queryByText('Loading...');
    expect(loadingMessage).toBeTruthy();
  });

  test('renders an error message', async () => {
    getFact.mockReturnValue(Promise.reject(new Error('Load failed.')));

    await renderComponent();
    const errorMessage = await waitFor(() =>
      renderResult.findByText('Load failed.')
    );
    expect(errorMessage).toBeTruthy();
  });

  test('renders', async () => {
    getFact.mockReturnValue(
      Promise.resolve({
        content:
          'According to a 2014 study, the melting properties of mozzarella make it the best cheese for topping pizza.',
        source: 'Mental Floss',
        sourceRef: 'https://uselessfacts.jsph.pl',
      })
    );

    await renderComponent();

    const header = renderResult.queryByRole('heading');
    expect(header).toBeTruthy();
    expect(header.textContent).toBe('Fact of the day');

    const fact = renderResult.queryByText(
      'According to a 2014 study, the melting properties of mozzarella make it the best cheese for topping pizza.'
    );
    expect(fact).toBeTruthy();

    const source = renderResult.queryByText('Credit goes to Mental Floss');
    expect(source).toBeTruthy();
  });
});

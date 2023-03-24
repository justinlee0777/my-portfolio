jest.mock('react-dom/server', () => {
  return {
    __esModule: true,
    renderToString: () => 'There was an error loading this resource',
  };
});

jest.mock('../../../components/loading-screen/loading-screen', () => () => {
  return <div>Loading...</div>;
});

const getPoem = jest.fn();

jest.mock('../../random-of-the-day.api', () => {
  return {
    __esModule: true,
    getPoem,
  };
});

import { cleanup, render, RenderResult, waitFor } from '@testing-library/react';

import RandomPoemOfTheDay from './random-poem-of-the-day';

describe('<RandomPoemOfTheDay/>', () => {
  let renderResult: RenderResult;

  async function renderComponent() {
    renderResult = await waitFor(() =>
      render(
        <RandomPoemOfTheDay
          header="Poem of the day"
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

    getPoem.mockReturnValue(promise);

    await renderComponent();
    const loadingMessage = renderResult.queryByText('Loading...');
    expect(loadingMessage).toBeTruthy();
  });

  test('renders an error message', async () => {
    getPoem.mockReturnValue(Promise.reject(new Error('Load failed.')));

    await renderComponent();
    const errorMessage = await waitFor(() =>
      renderResult.findByText('Load failed.')
    );
    expect(errorMessage).toBeTruthy();
  });

  test('renders', async () => {
    getPoem.mockReturnValue(
      Promise.resolve({
        author: 'Justin Lee',
        title: 'Foo',
        lines: ['Bar', '', 'Baz'],
        translator: 'Me',
      })
    );

    await renderComponent();

    const header = renderResult.queryByText('Poem of the day');
    expect(header).toBeTruthy();

    const poemTitle = renderResult.queryByText('Foo');
    expect(poemTitle).toBeTruthy();

    const translatorCredit = renderResult.queryByText('Translated by Me');
    expect(translatorCredit).toBeTruthy();

    const section = renderResult.container.querySelector('section');
    const sectionChildren = section.children;
    expect(sectionChildren[4].textContent).toBe('Bar');
    expect(sectionChildren[5].textContent).toBe('');
    expect(sectionChildren[6].textContent).toBe('Baz');
  });
});

jest.mock('react-dom/server', () => {
  return {
    __esModule: true,
    renderToString: () => 'There was an error loading this resource',
  };
});

jest.mock('../../../components/loading-screen/loading-screen', () => () => {
  return <div>Loading...</div>;
});

const getPainting = jest.fn();

jest.mock('../../random-of-the-day.api', () => {
  return {
    __esModule: true,
    getPainting,
  };
});

const loadImage = jest.fn();

jest.mock('../../../utils/load-image.function', () => {
  return {
    __esModule: true,
    loadImage,
  };
});

jest.mock('./high-res-image-dialog/high-res-image-dialog', () => () => {
  return <div>High res image shown.</div>;
});

import {
  act,
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';

import RandomPaintingOfTheDay from './random-painting-of-the-day';

describe('<RandomPaintingOfTheDay/>', () => {
  let renderResult: RenderResult;
  let resolveLoadImage;

  async function renderComponent() {
    renderResult = await waitFor(() =>
      render(
        <RandomPaintingOfTheDay
          header="Painting of the day"
          credit="Credit goes to the Met"
          openHighResImage="Open high res image"
          highResImageLoadFailed="Did not load high res image"
          randomOfTheDayApiUrl="http://example.com"
          linkedErrorMessage={{
            templateString: 'There was an error loading this resource',
            urls: [],
          }}
        />
      )
    );
  }

  beforeEach(() => {
    loadImage.mockReturnValue(
      new Promise((resolve) => (resolveLoadImage = resolve))
    );
  });

  afterEach(() => {
    cleanup();
    jest.resetModules();
  });

  test('renders a loading screen', async () => {
    let resolve;
    const promise = new Promise((resolveFn) => (resolve = resolveFn));

    getPainting.mockReturnValue(promise);

    await renderComponent();
    const loadingMessage = renderResult.queryByText('Loading...');
    expect(loadingMessage).toBeTruthy();
  });

  test('renders an error message', async () => {
    getPainting.mockReturnValue(Promise.reject(new Error('Load failed.')));

    await renderComponent();
    const errorMessage = await waitFor(() =>
      renderResult.findByText('Load failed.')
    );
    expect(errorMessage).toBeTruthy();
  });

  test('renders', async () => {
    getPainting.mockReturnValue(
      Promise.resolve({
        title: 'Lovely painting',
        artist: 'Justin Lee',
        images: {
          inline: 'http://example.com/inline-image.jpg',
          highRes: 'http://example.com/high-res-image.jpg',
        },
        credit: 'Met Museum',
        creditRef: 'https://metmuseum.github.io',
      })
    );

    await renderComponent();

    const header = renderResult.queryByText('Painting of the day');
    expect(header).toBeTruthy();

    const artist = renderResult.queryByText('Justin Lee');
    expect(artist).toBeTruthy();

    const painting = renderResult.queryByAltText('Painting of the day');
    expect(painting).toBeTruthy();

    const source = renderResult.queryByText('Credit goes to the Met');
    expect(source).toBeTruthy();
  });

  test('loads the high-res image', async () => {
    getPainting.mockReturnValue(
      Promise.resolve({
        title: 'Lovely painting',
        artist: 'Justin Lee',
        images: {
          inline: 'http://example.com/inline-image.jpg',
          highRes: 'http://example.com/high-res-image.jpg',
        },
        credit: 'Met Museum',
        creditRef: 'https://metmuseum.github.io',
      })
    );

    await renderComponent();

    let openHighRes = renderResult.queryByText(
      'Open high res image'
    ) as HTMLButtonElement;
    expect(openHighRes.disabled).toBe(true);

    await act(async () => resolveLoadImage());

    openHighRes = renderResult.queryByText(
      'Open high res image'
    ) as HTMLButtonElement;
    expect(openHighRes.disabled).toBe(false);

    fireEvent.click(openHighRes);

    const highResImage = renderResult.queryByText('High res image shown.');
    expect(highResImage).toBeTruthy();
  });

  test('shows an error message if the high-res image cannot load', async () => {
    getPainting.mockReturnValue(
      Promise.resolve({
        title: 'Lovely painting',
        artist: 'Justin Lee',
        images: {
          inline: 'http://example.com/inline-image.jpg',
          highRes: 'http://example.com/high-res-image.jpg',
        },
        credit: 'Met Museum',
        creditRef: 'https://metmuseum.github.io',
      })
    );

    let rejectLoadImage;
    loadImage.mockImplementation(
      () => new Promise((_, reject) => (rejectLoadImage = reject))
    );

    await renderComponent();

    await act(async () => rejectLoadImage());

    const errorMessage = await waitFor(() =>
      renderResult.queryByText('Did not load high res image')
    );
    expect(errorMessage).toBeTruthy();
  });
});

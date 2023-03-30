jest.useFakeTimers();

jest.mock('react-dom/server', () => {
  return {
    __esModule: true,
    renderToString: (link) => link.templateString,
  };
});

jest.mock('../components/loading-screen/loading-screen', () => () => {
  return <div>Loading...</div>;
});

jest.mock('./animations/create-marker.function', () => {
  return {
    __esModule: true,
    createMarker: () => {
      const marker = document.createElement('div');
      marker.classList.add('marker');
      return marker;
    },
  };
});

jest.mock(
  './animations/animate-block.function',
  () => () =>
    new Promise((resolve) => setTimeout(() => resolve(() => {}), 1000))
);

const getCompanySpecificCoverLetter = jest.fn();

jest.mock('./cover-letter.api', () => {
  return {
    __esModule: true,
    getCompanySpecificCoverLetter,
  };
});

import {
  act,
  cleanup,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';

import CoverLetterPage from './index';

describe('<CoverLetterPage/>', () => {
  let renderResult: RenderResult;
  let resolveFn: Function;

  async function renderComponent() {
    getCompanySpecificCoverLetter.mockReturnValue(
      new Promise((resolve) => (resolveFn = resolve))
    );

    renderResult = await waitFor(() =>
      render(
        <CoverLetterPage
          locale=""
          route="/cover-letter"
          apiUrl="http://api.example.com"
          unitTestResult={{} as any}
          pageConfig={{} as any}
          opening="<p>Foo.</p><p>Bar.</p><p>Baz.</p>"
          config={{
            textContent: {
              secondSectionOpening: 'Company specific info incoming.',
              ending: ['I hope to hear back soon.', 'Sincerely, Justin.'],
              companySpecificCoverErrorMessage:
                'For some reason, the company-specific content did not load.',
            },
          }}
        />
      )
    );
  }

  afterEach(() => {
    cleanup();
    jest.resetModules();
    jest.clearAllTimers();
  });

  test('renders', async () => {
    await renderComponent();

    const coverLetter = renderResult.container.children[0];
    expect(coverLetter).toBeTruthy();
    expect(coverLetter.classList.contains('coverLetter')).toBe(true);

    const opening = [
      renderResult.queryByText('Foo.'),
      renderResult.queryByText('Bar.'),
      renderResult.queryByText('Baz.'),
    ];

    expect(opening[0]).toBeTruthy();
    expect(opening[1]).toBeTruthy();
    expect(opening[2]).toBeTruthy();

    const secondSectionOpening = renderResult.queryByText(
      'Company specific info incoming.'
    );
    expect(secondSectionOpening).toBeTruthy();

    const ending = [
      renderResult.queryByText('I hope to hear back soon.'),
      renderResult.queryByText('Sincerely, Justin.'),
    ];

    expect(ending[0]).toBeTruthy();
    expect(ending[1]).toBeTruthy();
  });

  test('finishes the animation', async () => {
    await renderComponent();

    await act(async () =>
      resolveFn(
        "<p>I have done research on your company.</p><p>I think it is swell.</p><p>Let's talk more.</p>"
      )
    );

    const companySpecific = [
      renderResult.queryByText('I have done research on your company.'),
      renderResult.queryByText('I think it is swell.'),
      renderResult.queryByText("Let's talk more."),
    ];

    expect(companySpecific[0]).toBeTruthy();
    expect(companySpecific[1]).toBeTruthy();
    expect(companySpecific[2]).toBeTruthy();

    let activatedElements =
      renderResult.container.querySelectorAll('[data-activated]');
    expect(activatedElements.length).toBe(1);

    const renderingTimeInMS = 1000 / 60;
    // Offset for beginning and ending the timer.
    const offset = renderingTimeInMS * 2;
    await act(async () =>
      jest.advanceTimersByTime(offset + 'Foo.'.length * renderingTimeInMS)
    );

    activatedElements =
      renderResult.container.querySelectorAll('[data-activated]');
    expect(activatedElements.length).toBe(2);

    await act(async () =>
      jest.advanceTimersByTime(offset + 'Bar.'.length * renderingTimeInMS)
    );

    activatedElements =
      renderResult.container.querySelectorAll('[data-activated]');
    expect(activatedElements.length).toBe(3);

    await act(async () =>
      jest.advanceTimersByTime(offset + 'Baz.'.length * renderingTimeInMS)
    );

    activatedElements =
      renderResult.container.querySelectorAll('[data-activated]');
    expect(activatedElements.length).toBe(4);

    // This is animating the video.
    await act(async () => jest.advanceTimersByTime(1000));

    activatedElements =
      renderResult.container.querySelectorAll('[data-activated]');
    expect(activatedElements.length).toBe(5);

    await act(async () =>
      jest.advanceTimersByTime(
        offset + 'Company specific info incoming.'.length * renderingTimeInMS
      )
    );

    activatedElements =
      renderResult.container.querySelectorAll('[data-activated]');
    expect(activatedElements.length).toBe(6);

    await act(async () =>
      jest.advanceTimersByTime(
        offset +
          'I have done research on your company.'.length * renderingTimeInMS
      )
    );

    activatedElements =
      renderResult.container.querySelectorAll('[data-activated]');
    expect(activatedElements.length).toBe(7);

    await act(async () =>
      jest.advanceTimersByTime(
        offset + 'I think it is swell.'.length * renderingTimeInMS
      )
    );

    activatedElements =
      renderResult.container.querySelectorAll('[data-activated]');
    expect(activatedElements.length).toBe(8);

    await act(async () =>
      jest.advanceTimersByTime(
        offset + "Let's talk more.".length * renderingTimeInMS
      )
    );

    activatedElements =
      renderResult.container.querySelectorAll('[data-activated]');
    expect(activatedElements.length).toBe(9);

    await act(async () =>
      jest.advanceTimersByTime(
        offset + 'I hope to hear back soon.'.length * renderingTimeInMS
      )
    );

    activatedElements =
      renderResult.container.querySelectorAll('[data-activated]');
    expect(activatedElements.length).toBe(10);

    await act(async () =>
      jest.advanceTimersByTime(
        offset + 'Sincerely, Justin.'.length * renderingTimeInMS
      )
    );

    const lastLine = renderResult.queryByText('Sincerely, Justin.');
    expect(lastLine).toBeTruthy();
  });
});

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
          config={{
            textContent: {
              header: "Hello, I'm <span id='justin-lee'>Justin Lee<span>.",
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

    await act(async () =>
      resolveFn(
        `
        <p>Foo.</p>
        <p>Bar.</p>
        <p>Baz.</p>
        <p>Company specific info incoming.</p>
        <p>I have done research on your company.</p>
        <p>I think it is swell.</p>
        <p>Let's talk more.</p>
        <p>I hope to hear back soon.</p>
        <p>Sincerely, Justin.</p>
        `
      )
    );

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

    const companySpecific = [
      renderResult.queryByText('I have done research on your company.'),
      renderResult.queryByText('I think it is swell.'),
      renderResult.queryByText("Let's talk more."),
    ];

    expect(companySpecific[0]).toBeTruthy();
    expect(companySpecific[1]).toBeTruthy();
    expect(companySpecific[2]).toBeTruthy();

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
        `
        <p>Foo.</p>
        <p>Bar.</p>
        <p>Baz.</p>
        <p>Company specific info incoming.</p>
        <p>I have done research on your company.</p>
        <p>I think it is swell.</p>
        <p>Let's talk more.</p>
        <p>I hope to hear back soon.</p>
        <p>Sincerely, Justin.</p>
        `
      )
    );

    let header = renderResult.container.querySelector('h1');
    expect(header).toBeTruthy();
    expect(header.textContent).toBe(' ');

    const renderingTimeInMS = 100;
    await act(async () =>
      jest.advanceTimersByTime('Hello'.length * renderingTimeInMS)
    );

    header = renderResult.container.querySelector('h1');
    expect(header.textContent).toBe('Hello ');

    await act(async () =>
      jest.advanceTimersByTime((", I'm ".length + 1) * renderingTimeInMS)
    );

    header = renderResult.container.querySelector('h1');
    expect(header.textContent).toBe("Hello, I'm  ");

    await act(async () =>
      jest.advanceTimersByTime('Justin'.length * renderingTimeInMS)
    );

    header = renderResult.container.querySelector('h1');
    expect(header.textContent).toBe("Hello, I'm Justin ");

    let renderedSpan = header.querySelector('#justin-lee');
    expect(renderedSpan).toBeTruthy();
    expect(renderedSpan.textContent).toBe('Justin');

    const coverLetterContentAnimated = renderResult.container.querySelector(
      '.coverLetterContentActivated'
    );
    expect(coverLetterContentAnimated).toBeTruthy();

    await act(async () =>
      jest.advanceTimersByTime(' Lee'.length * renderingTimeInMS)
    );

    await act(async () =>
      jest.advanceTimersByTime('.'.length * renderingTimeInMS)
    );

    header = renderResult.container.querySelector('h1');
    expect(header.textContent).toBe("Hello, I'm Justin Lee. ");

    renderedSpan = header.querySelector('#justin-lee');
    expect(renderedSpan.textContent).toBe('Justin Lee.');
  });
});

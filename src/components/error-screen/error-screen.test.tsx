jest.mock('react-dom/server', () => {
  return {
    __esModule: true,
    renderToString: () =>
      '<a href="mailto:leej40@outlook.com">leej40@outlook.com</a>',
  };
});

import { cleanup, render, RenderResult } from '@testing-library/react';

import ErrorScreen from './error-screen';

describe('<ErrorScreen/>', () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(
      <ErrorScreen
        linkedMessage={{
          templateString: 'Please contact me at ${leej40@outlook.com}',
          urls: ['mailto:leej40@outlook.com'],
        }}
        errorMessages={['Useful info on the error here.']}
      />
    );
  });

  afterEach(() => {
    cleanup();
    jest.resetModules();
  });

  test('renders', () => {
    const templateString = renderResult.queryByText(
      (_, element) =>
        element.textContent === 'Please contact me at leej40@outlook.com'
    );
    expect(templateString).toBeTruthy();

    const link = renderResult.queryByRole('link') as HTMLLinkElement;
    expect(link).toBeTruthy();
    expect(link.href).toBe('mailto:leej40@outlook.com');

    const errorMessage = renderResult.queryByText(
      'Useful info on the error here.'
    );
    expect(errorMessage).toBeTruthy();
  });
});

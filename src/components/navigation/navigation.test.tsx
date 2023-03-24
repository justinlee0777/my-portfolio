import { cleanup, render, screen } from '@testing-library/react';

import { Navigation } from './navigation';

describe('<Navigation/>', () => {
  afterEach(() => {
    cleanup();
    jest.resetModules();
  });

  test('renders', () => {
    const renderResult = render(
      <Navigation
        locale="en"
        links={[
          {
            displayName: 'Foo',
            url: '/foo',
          },
          {
            displayName: 'Bar',
            url: '/bar',
          },
          {
            displayName: 'Baz',
            url: '/baz',
          },
        ]}
      />
    );

    expect((renderResult.container.childNodes[0] as HTMLElement).tagName).toBe(
      'NAV'
    );

    const skipLink = screen.queryByText('Skip to main content');
    expect(skipLink).toBeTruthy();
    expect(skipLink.tagName).toBe('A');

    const fooLink = screen.queryByText('Foo');
    expect(fooLink).toBeTruthy();

    const barLink = screen.queryByText('Bar');
    expect(barLink).toBeTruthy();

    const bazLink = screen.queryByText('Baz');
    expect(bazLink).toBeTruthy();
  });
});

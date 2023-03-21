jest.mock('../../../components/unit-test-check/unit-test-check', () => () => (
  <span></span>
));

import { render, RenderResult } from '@testing-library/react';

import Musings from './musings';

describe('<Musings/>', () => {
  function renderMusings(): RenderResult {
    return render(
      <Musings
        musings={[
          {
            slug: 'foo',
            display: {
              title: 'Foo',
              description: 'Foofoofoo',
              timestamp: '',
              contentHtml: '',
            },
            seo: {
              title: 'Foo',
              description: 'Foofoofoo',
            },
          },
          {
            slug: 'bar',
            display: {
              title: 'Bar',
              description: 'Barbarbar',
              timestamp: '',
              contentHtml: '',
            },
            seo: {
              title: 'Bar',
              description: 'Barbarbar',
            },
          },
          {
            slug: 'baz',
            display: {
              title: 'Baz',
              description: 'Bazbazbaz',
              timestamp: '',
              contentHtml: '',
            },
            seo: {
              title: 'Baz',
              description: 'Bazbazbaz',
            },
          },
        ]}
      />
    );
  }

  test('renders', () => {
    const renderResult = renderMusings();

    const listItems = renderResult.queryAllByRole('listitem');
    expect(listItems.length).toBe(3);

    expect(renderResult.queryByText('Foo')).toBeTruthy();

    expect(renderResult.queryByText('Bar')).toBeTruthy();

    expect(renderResult.queryByText('Baz')).toBeTruthy();
  });
});

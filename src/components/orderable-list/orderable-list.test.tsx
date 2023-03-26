import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';

import OrderableList from './orderable-list';

describe('<OrderableList/>', () => {
  let onReorder: jest.MockedFn<() => void>;
  let renderResult: RenderResult;

  beforeEach(() => {
    onReorder = jest.fn();

    renderResult = render(
      <OrderableList
        listElements={[
          {
            value: 'foo',
            element: <span>Foo</span>,
          },
          {
            value: 'bar',
            element: <span>Bar</span>,
          },
          {
            value: 'baz',
            element: <span>Baz</span>,
          },
        ]}
        onReorder={onReorder}
      />
    );
  });

  afterEach(() => {
    cleanup();
    jest.resetModules();
  });

  test('renders', () => {
    const orderedList = renderResult.queryByRole('list');
    expect(orderedList).toBeTruthy();

    const foo = renderResult.queryByText('Foo');
    expect(foo).toBeTruthy();

    const bar = renderResult.queryByText('Bar');
    expect(bar).toBeTruthy();

    const baz = renderResult.queryByText('Baz');
    expect(baz).toBeTruthy();

    // Test arrows

    const fooMoveUp = renderResult.queryByLabelText('Move "foo" section up');
    expect(fooMoveUp.className).toBe('arrow arrowHidden');

    const fooMoveDown = renderResult.queryByLabelText(
      'Move "foo" section down'
    );
    expect(fooMoveDown).toBeTruthy();

    const barMoveUp = renderResult.queryByLabelText('Move "bar" section up');
    expect(barMoveUp).toBeTruthy();

    const barMoveDown = renderResult.queryByLabelText(
      'Move "bar" section down'
    );
    expect(barMoveDown).toBeTruthy();

    const bazMoveUp = renderResult.queryByLabelText('Move "baz" section up');
    expect(bazMoveUp).toBeTruthy();

    const bazMoveDown = renderResult.queryByLabelText(
      'Move "baz" section down'
    );
    expect(bazMoveDown.className).toBe('arrow arrowHidden');
  });

  test('swaps elements', () => {
    const fooMoveDown = renderResult.queryByLabelText(
      'Move "foo" section down'
    );

    fireEvent.click(fooMoveDown);

    expect(onReorder.mock.calls[0]).toEqual([['bar', 'foo', 'baz']]);

    const bazMoveUp = renderResult.queryByLabelText('Move "baz" section up');

    fireEvent.click(bazMoveUp);

    expect(onReorder.mock.calls[1]).toEqual([['foo', 'baz', 'bar']]);
  });
});

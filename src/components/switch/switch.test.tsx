import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';

import Switch from './switch';

describe('<Switch/>', () => {
  let onChange: jest.MockedFn<() => void>;
  let renderResult: RenderResult;

  beforeEach(() => {
    onChange = jest.fn();

    renderResult = render(<Switch onChange={onChange} />);
  });

  afterEach(() => {
    cleanup();
    jest.resetModules();
  });

  test('renders', () => {
    const switchElement = renderResult.queryByRole('switch');
    expect(switchElement).toBeTruthy();
  });

  test('toggles the component state', () => {
    const switchElement = renderResult.queryByRole('switch')!;

    fireEvent.click(switchElement);

    expect(onChange.mock.calls[0]).toEqual([true]);

    fireEvent.click(switchElement);

    expect(onChange.mock.calls[1]).toEqual([true]);

    renderResult.rerender(<Switch value={true} onChange={onChange} />);

    fireEvent.click(switchElement);

    expect(onChange.mock.calls[2]).toEqual([false]);
  });
});

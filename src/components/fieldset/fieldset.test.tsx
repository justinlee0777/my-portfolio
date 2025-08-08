import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import FieldSet from './fieldset';

describe('<FieldSet/>', () => {
  let onSelect: jest.MockedFn<() => void>;

  beforeEach(() => {
    onSelect = jest.fn();

    render(
      <FieldSet legend="Test legend">
        <>
          <input id="foo" type="radio" name="Foo" />
          <label htmlFor="foo">Foo</label>
          <input id="bar" type="radio" name="Bar" />
          <label htmlFor="bar">Bar</label>
          <input id="baz" type="radio" name="Baz" />
          <label htmlFor="baz">Baz</label>
        </>
      </FieldSet>
    );
  });

  afterEach(() => {
    cleanup();
    jest.resetModules();
  });

  test('renders', async () => {
    const legend = await waitFor(() => screen.findByText('Test legend'));
    expect(legend).toBeTruthy();
    expect(legend.parentElement!.tagName).toBe('FIELDSET');

    const fooOption = screen.queryByLabelText('Foo');
    expect(fooOption).toBeFalsy();

    const barOption = screen.queryByLabelText('Bar');
    expect(barOption).toBeFalsy();

    const bazOption = screen.queryByLabelText('Baz');
    expect(bazOption).toBeFalsy();
  });

  test('expands to show options', async () => {
    fireEvent.click(screen.queryByText('+')!);

    const fooOption: HTMLInputElement = await waitFor(() =>
      screen.findByLabelText('Foo')
    );
    expect(fooOption).toBeTruthy();
    expect(fooOption.tagName).toBe('INPUT');
    expect(fooOption.checked).toBe(false);

    const barOption = screen.queryByLabelText('Bar') as HTMLInputElement;
    expect(barOption).toBeTruthy();
    expect(barOption.tagName).toBe('INPUT');
    expect(barOption.checked).toBe(false);

    const bazOption = screen.queryByLabelText('Baz') as HTMLInputElement;
    expect(bazOption).toBeTruthy();
    expect(bazOption.tagName).toBe('INPUT');
    expect(bazOption.checked).toBe(false);
  });
});

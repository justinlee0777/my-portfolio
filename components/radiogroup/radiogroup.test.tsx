import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import RadioGroup, { RadioGroupOption } from './radiogroup';

describe('<RadioGroup/>', () => {
  const options: Array<RadioGroupOption> = [
    {
      key: 'foo',
      label: 'Foo',
      value: 'foo',
    },
    {
      key: 'baz',
      label: 'Baz',
      value: 'baz',
    },
    {
      key: 'bar',
      label: 'Bar',
      value: 'bar',
    },
  ];

  let onSelect: jest.MockedFn<() => void>;

  beforeEach(() => {
    onSelect = jest.fn();

    render(
      <RadioGroup
        legend="Test legend"
        name="Test"
        options={options}
        selectedOption={options[0].value}
        onSelect={onSelect}
      />
    );
  });

  afterEach(() => {
    cleanup();
    jest.resetModules();
  });

  test('renders', async () => {
    const legend = await waitFor(() => screen.findByText('Test legend'));
    expect(legend).toBeTruthy();
    expect(legend.parentElement.tagName).toBe('FIELDSET');

    const fooOption = screen.queryByLabelText('Foo');
    expect(fooOption).toBeFalsy();

    const barOption = screen.queryByLabelText('Bar');
    expect(barOption).toBeFalsy();

    const bazOption = screen.queryByLabelText('Baz');
    expect(bazOption).toBeFalsy();
  });

  test('expands the radio group to show options', async () => {
    fireEvent.click(screen.queryByText('+'));

    const fooOption = screen.queryByLabelText('Foo') as HTMLInputElement;
    expect(fooOption).toBeTruthy();
    expect(fooOption.tagName).toBe('INPUT');
    expect(fooOption.checked).toBe(true);

    const barOption = screen.queryByLabelText('Bar') as HTMLInputElement;
    expect(barOption).toBeTruthy();
    expect(barOption.tagName).toBe('INPUT');
    expect(barOption.checked).toBe(false);

    const bazOption = screen.queryByLabelText('Baz') as HTMLInputElement;
    expect(bazOption).toBeTruthy();
    expect(bazOption.tagName).toBe('INPUT');
    expect(bazOption.checked).toBe(false);
  });

  test('expands the radio group to show options and selects one', async () => {
    fireEvent.click(screen.queryByText('+'));

    fireEvent.click(screen.queryByLabelText('Baz'));

    expect(onSelect.mock.calls[0]).toEqual(['baz']);
  });
});

jest.mock('../fieldset/fieldset', () => ({ children }) => (
  <div>{children}</div>
));

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import RadioGroupOption from './radio-group-option.interface';
import RadioGroup from './radiogroup';

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
    const fooOption: HTMLInputElement = await waitFor(() =>
      screen.findByLabelText('Foo')
    );
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

  test('selects one', async () => {
    fireEvent.click(screen.queryByLabelText('Baz'));

    expect(onSelect.mock.calls[0]).toEqual(['baz']);
  });
});

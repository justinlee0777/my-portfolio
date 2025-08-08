import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';

import HighResImageDialog from './high-res-image-dialog';

describe('<HighResImageDialog/>', () => {
  let renderResult: RenderResult;

  let onCloseSpy: jest.Mock;

  beforeEach(() => {
    onCloseSpy = jest.fn();

    renderResult = render(
      <HighResImageDialog imageUrl="http://example.com" onClose={onCloseSpy} />
    );
  });

  afterEach(() => {
    cleanup();
    jest.resetModules();
  });

  test('renders', () => {
    const dialog = renderResult.queryByRole('dialog', { hidden: true });
    expect(dialog).toBeTruthy();

    const image = renderResult.queryByAltText(
      'Expanded high resolution image'
    ) as HTMLImageElement;
    expect(image).toBeTruthy();
    expect(image.src).toBe('http://example.com/');
  });

  test('closes the dialog', () => {
    const button = renderResult.queryByText(String.fromCharCode(10799))!;

    fireEvent.click(button);

    expect(onCloseSpy.mock.calls[0]).toBeTruthy();
  });
});

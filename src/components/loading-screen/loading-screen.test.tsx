jest.useFakeTimers();

import { act, cleanup, render, RenderResult } from '@testing-library/react';

import LoadingScreen from './loading-screen';

describe('<LoadingScreen/>', () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(<LoadingScreen />);
  });

  afterEach(() => {
    cleanup();
    jest.resetModules();
    jest.clearAllTimers();
  });

  test('renders', () => {
    const message = renderResult.queryByText("We're preparing your changes...");
    expect(message).toBeTruthy();

    const ticks = [
      ...renderResult.container.querySelector('.loadingIcon').childNodes,
    ] as Array<HTMLElement>;

    expect(ticks[0].className).toEqual('loadingTick animated');
    expect(ticks[1].className).toEqual('loadingTick');
    expect(ticks[2].className).toEqual('loadingTick');
  });

  test('changes animated ticks', async () => {
    act(() => jest.advanceTimersByTime(333));

    const ticks = [
      ...renderResult.container.querySelector('.loadingIcon').childNodes,
    ] as Array<HTMLElement>;

    expect(ticks[0].className).toEqual('loadingTick');
    expect(ticks[1].className).toEqual('loadingTick animated');
    expect(ticks[2].className).toEqual('loadingTick');

    act(() => jest.advanceTimersByTime(333));

    expect(ticks[0].className).toEqual('loadingTick');
    expect(ticks[1].className).toEqual('loadingTick');
    expect(ticks[2].className).toEqual('loadingTick animated');

    act(() => jest.advanceTimersByTime(333));

    expect(ticks[0].className).toEqual('loadingTick');
    expect(ticks[1].className).toEqual('loadingTick');
    expect(ticks[2].className).toEqual('loadingTick');

    act(() => jest.advanceTimersByTime(333));

    expect(ticks[0].className).toEqual('loadingTick animated');
    expect(ticks[1].className).toEqual('loadingTick');
    expect(ticks[2].className).toEqual('loadingTick');
  });
});

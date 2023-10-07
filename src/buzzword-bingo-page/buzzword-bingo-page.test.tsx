const mockAnimateSlides = jest.fn();

jest.mock('buzzword-bingo-generator', () => () => <div></div>);
jest.mock('../components/slide/slide', () => ({ children }) => (
  <div>{children}</div>
));
jest.mock('../utils/animate-slides.function', () => {
  return {
    __esModule: true,
    animateSlides: mockAnimateSlides,
  };
});

import { cleanup, render, screen } from '@testing-library/react';

import BuzzwordBingoPage from './buzzword-bingo-page';
import SlideAnimation from '../models/slide-animation.enum';
import BuzzwordBingoConfig from './models/buzzword-bingo-config.model';

describe('<BuzzwordBingoPage/>', () => {
  const buzzwordBingoConfig: BuzzwordBingoConfig = {
    seo: {
      title: 'title',
      description: 'description',
    },
    textContent: {
      header: 'Header',
      explanation: ['Buzzword bingo is awesome.', 'Super fun.', 'Most rad.'],
    },
  };

  afterEach(() => {
    cleanup();
    jest.resetModules();
  });

  test('renders', () => {
    render(
      <BuzzwordBingoPage
        buzzwordBingoConfig={buzzwordBingoConfig}
        animation={SlideAnimation.SWEEPY}
      />
    );

    const header = screen.queryByText('Header');
    expect(header).toBeTruthy();
    expect(header.tagName).toBe('H1');

    const line1 = screen.queryByText('Buzzword bingo is awesome.');
    expect(line1).toBeTruthy();

    const line2 = screen.queryByText('Super fun.');
    expect(line2).toBeTruthy();

    const line3 = screen.queryByText('Most rad.');
    expect(line3).toBeTruthy();
  });

  test('animates the page with marquee animation', () => {
    render(
      <BuzzwordBingoPage
        buzzwordBingoConfig={buzzwordBingoConfig}
        animation={SlideAnimation.MARQUEE}
      />
    );

    const header = screen.queryByText('Header');
    const explanation = screen.queryByText(
      (_, element) =>
        element.textContent === 'Buzzword bingo is awesome.Super fun.Most rad.'
    );

    const args = mockAnimateSlides.mock.calls[0];
    expect(args[0]).toBe(SlideAnimation.SWEEPY);
    expect(args[1]).toEqual([header, explanation]);
  });
});

jest.mock(
  '../radiogroup/radiogroup',
  () =>
    ({ options, selectedOption, onSelect }) => {
      return (
        <>
          <span>Selected: {selectedOption}</span>
          {options.map((option) => (
            <button key={option.key} onClick={() => onSelect(option.value)}>
              {option.label}
            </button>
          ))}
        </>
      );
    }
);

jest.mock('../switch/switch', () => ({ value, onChange }) => {
  return (
    <>
      <span>Toggle: {value}</span>
      <button onClick={() => onChange(!value)}>Toggle state</button>
    </>
  );
});

jest.mock('react-dom/server', () => {
  return {
    __esModule: true,
    renderToString: () =>
      '<a href="http://example.com">Marquees are great.</a>',
  };
});

import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  screen,
} from '@testing-library/react';

import { Font } from '../../config/font.enum';
import { SlideAnimation } from '../../config/slide-animation.enum';
import { Theme } from '../../config/theme.enum';
import { SettingsConfig } from '../../config/settings.config';
import Settings from './settings';

describe('<Settings/>', () => {
  const config: SettingsConfig = {
    textContent: {
      header: 'Settings',
      subheader: 'Sub-Settings',
      prompt: 'Change up them settings.',
      explanation: {
        marquee: {
          templateString: 'Marquees are great.',
          urls: [],
        },
        tiltPrism: {
          templateString: 'Tilt prism is great.',
          urls: [],
        },
      },
    },
  };

  const font = Font.ROBOTO;
  const theme = Theme.STARRY_NIGHT;
  const animation = SlideAnimation.SWEEPY;
  const developerMode = false;

  let onFontChange = jest.fn();
  let onThemeChange = jest.fn();
  let onAnimationChange = jest.fn();
  let onDeveloperModeChange = jest.fn();

  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(
      <Settings
        config={config}
        font={font}
        theme={theme}
        animation={animation}
        developerMode={developerMode}
        onFontChange={onFontChange}
        onThemeChange={onThemeChange}
        onAnimationChange={onAnimationChange}
        onDeveloperModeChange={onDeveloperModeChange}
      />
    );
  });

  afterEach(() => {
    cleanup();
    jest.resetModules();
  });

  test('renders', () => {
    const header = screen.queryByText('Settings');
    expect(header).toBeTruthy();
    expect(header.tagName).toBe('H2');

    const subheader = screen.queryByText('Sub-Settings');
    expect(subheader).toBeTruthy();
    expect(subheader.tagName).toBe('H3');

    const prompt = screen.queryByText('Change up them settings.');
    expect(prompt).toBeTruthy();

    const selectedFont = screen.queryByText('Selected: Roboto');
    expect(selectedFont).toBeTruthy();

    const selectedTheme = screen.queryByText('Selected: Starry Night');
    expect(selectedTheme).toBeTruthy();

    const selectedAnimation = screen.queryByText('Selected: Sweepy');
    expect(selectedAnimation).toBeTruthy();
  });

  test('renders and changes settings', async () => {
    const clickedFont = screen.queryByText('Arial');
    fireEvent.click(clickedFont);

    expect(onFontChange.mock.calls[0]).toEqual([Font.ARIAL]);

    const clickedTheme = screen.queryByText('Sea');
    fireEvent.click(clickedTheme);

    expect(onThemeChange.mock.calls[0]).toEqual([Theme.SEA]);

    const clickedAnimation = screen.queryByText('Swoopy');
    fireEvent.click(clickedAnimation);

    expect(onAnimationChange.mock.calls[0]).toEqual([SlideAnimation.SWOOPY]);

    const clickedDeveloperMode = screen.queryByText('Toggle state');
    fireEvent.click(clickedDeveloperMode);

    expect(onDeveloperModeChange.mock.calls[0]).toEqual([true]);
  });

  test('renders and shows marquee explanation', () => {
    renderResult.rerender(
      <Settings
        config={config}
        font={font}
        theme={theme}
        animation={SlideAnimation.MARQUEE}
        developerMode={developerMode}
        onFontChange={onFontChange}
        onThemeChange={onThemeChange}
        onAnimationChange={onAnimationChange}
        onDeveloperModeChange={onDeveloperModeChange}
      />
    );

    const marqueeExplanation = screen.queryByText('Marquees are great.');
    expect(marqueeExplanation).toBeTruthy();
  });

  test('renders and shows tilt prism explanation', () => {
    renderResult.rerender(
      <Settings
        config={config}
        font={Font.TILT_PRISM}
        theme={theme}
        animation={animation}
        developerMode={developerMode}
        onFontChange={onFontChange}
        onThemeChange={onThemeChange}
        onAnimationChange={onAnimationChange}
        onDeveloperModeChange={onDeveloperModeChange}
      />
    );

    const tiltPrismExplanation = screen.queryByText('Tilt prism is great.');
    expect(tiltPrismExplanation).toBeTruthy();
  });
});

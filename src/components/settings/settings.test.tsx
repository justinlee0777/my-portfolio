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

import SettingsContext from '../../contexts/settings/settings.context';
import Font from '../../models/font.enum';
import SlideAnimation from '../../models/slide-animation.enum';
import Theme from '../../models/theme.enum';
import SettingsConfig from './models/settings-config.interface';
import Settings from './settings';

describe('<Settings/>', () => {
  const config: SettingsConfig = {
    textContent: {
      header: 'Settings',
      subheader: 'Sub-Settings',
      prompt: 'Change up them settings.',
      explanation: {
        translation: {
          templateString: 'Translated by I.',
          urls: [],
        },
        marquee: {
          templateString: 'Marquees are great.',
          urls: [],
        },
        tiltPrism: {
          templateString: 'Tilt prism is great.',
          urls: [],
        },
        eater: {
          templateString: 'Eater is great.',
          urls: [],
        },
        developerMode: 'Developer mode is wicked awesome.',
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
      <SettingsContext.Provider
        value={{
          font,
          theme,
          animation,
          developerMode,
          onFontChange,
          onThemeChange,
          onAnimationChange,
          onDeveloperModeChange,
        }}
      >
        <Settings config={config} />
      </SettingsContext.Provider>
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

    const developerModeExplanation = screen.queryByText(
      'Developer mode is wicked awesome.'
    );
    expect(developerModeExplanation).toBeTruthy();

    const translationExplanation = screen.queryByText('Translated by I.');
    expect(translationExplanation).toBeTruthy();
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
      <SettingsContext.Provider
        value={{
          font,
          theme,
          animation: SlideAnimation.MARQUEE,
          developerMode,
          onFontChange,
          onThemeChange,
          onAnimationChange,
          onDeveloperModeChange,
        }}
      >
        <Settings config={config} />
      </SettingsContext.Provider>
    );

    const marqueeExplanation = screen.queryByText('Marquees are great.');
    expect(marqueeExplanation).toBeTruthy();
  });

  test('renders and shows tilt prism explanation', () => {
    renderResult.rerender(
      <SettingsContext.Provider
        value={{
          font: Font.TILT_PRISM,
          theme,
          animation,
          developerMode,
          onFontChange,
          onThemeChange,
          onAnimationChange,
          onDeveloperModeChange,
        }}
      >
        <Settings config={config} />
      </SettingsContext.Provider>
    );

    const tiltPrismExplanation = screen.queryByText('Tilt prism is great.');
    expect(tiltPrismExplanation).toBeTruthy();
  });

  test('renders and shows an eater explanation', () => {
    renderResult.rerender(
      <SettingsContext.Provider
        value={{
          font: Font.EATER,
          theme,
          animation,
          developerMode,
          onFontChange,
          onThemeChange,
          onAnimationChange,
          onDeveloperModeChange,
        }}
      >
        <Settings config={config} />
      </SettingsContext.Provider>
    );

    const tiltPrismExplanation = screen.queryByText('Eater is great.');
    expect(tiltPrismExplanation).toBeTruthy();
  });
});

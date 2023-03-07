jest.mock('../settings/settings', () => () => <div></div>);

import {
  cleanup,
  render,
  screen,
  RenderResult,
  fireEvent,
} from '@testing-library/react';

import { Font } from '../../config/font.enum';
import { OpenSettingsConfig } from '../../config/open-settings.config';
import { SlideAnimation } from '../../config/slide-animation.enum';
import { Theme } from '../../config/theme.enum';

import OpenSettings from './open-settings';

describe('<OpenSettings/>', () => {
  const config: OpenSettingsConfig = {
    aria: {
      expandLabel: 'expand',
      collapseLabel: 'collapse',
    },
    settings: {
      textContent: {
        header: 'Settings header',
        subheader: 'Settings subheader',
        prompt: 'Settings prompt',
        explanation: {
          translation: {
            templateString: 'Translated by I',
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
            templateString: 'Eater is great',
            urls: [],
          },
          developerMode: 'Developer mode',
        },
      },
    },
  };

  const classname = 'openSettingsTest';

  const font = Font.ARIAL;
  const theme = Theme.MONOCHROME;
  const animation = SlideAnimation.SWEEPY;
  const developerMode = false;

  const onFontChange = jest.fn();
  const onThemeChange = jest.fn();
  const onAnimationChange = jest.fn();
  const onDeveloperModeChange = jest.fn();

  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(
      <OpenSettings
        className={classname}
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
    expect(
      (renderResult.container.firstChild as HTMLElement).classList.toString()
    ).toBe('menu openSettingsTest');
  });

  test('opens the menu', () => {
    let openMenu = screen.queryByRole('button', {
      name: 'expand',
      expanded: false,
    });
    expect(openMenu).toBeTruthy();

    fireEvent.click(openMenu);
    openMenu = screen.queryByRole('button', {
      name: 'collapse',
      expanded: true,
    });
    expect(openMenu).toBeTruthy();

    fireEvent.click(openMenu);
    openMenu = screen.queryByRole('button', {
      name: 'expand',
      expanded: false,
    });
    expect(openMenu).toBeTruthy();
  });
});

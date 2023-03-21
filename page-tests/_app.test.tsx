jest.mock('lodash-es', () => {
  return {
    __esModule: true,
    cloneDeep: (object) => object,
  };
});

jest.mock('../src/components/navigation/navigation', () => {
  return {
    __esModule: true,
    Navigation: () => <div>Navigation here</div>,
  };
});

jest.mock('../src/components/open-settings/open-settings', () => () => {
  return <div>Open Settings</div>;
});

jest.mock('../src/contexts/unit-test.context', () => {
  return {
    __esModule: true,
    UnitTestContext: {
      Provider: ({ children, value }) => (
        <div>
          <span>Developer mode: {value.developerMode?.toString()}</span>
          {children}
        </div>
      ),
    },
  };
});

jest.mock('../src/components/unit-test-check/unit-test-check', () => () => (
  <span></span>
));

jest.mock('../src/components/slide/slide', () => ({ children }) => (
  <div>{children}</div>
));

jest.mock('../src/components/loading-screen/loading-screen', () => () => (
  <div>Loading screen...</div>
));

let pageDefaults;

const mockSetPageDefaults = jest.fn();

jest.mock('../src/config/get-page-defaults.function', () => {
  return {
    __esModule: true,
    getPageDefaults: jest.fn().mockImplementation(() => pageDefaults),
    setPageDefaults: mockSetPageDefaults,
  };
});

let loadFontReturnValue;

jest.mock('../src/config/load-font.function', () => {
  return {
    __esModule: true,
    loadFont: jest.fn().mockImplementation(() => loadFontReturnValue),
  };
});

import {
  act,
  cleanup,
  render,
  RenderResult,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { Font } from '../src/config/font.enum';
import { PageConfig } from '../src/config/page.config';
import { SlideAnimation } from '../src/config/slide-animation.enum';
import { Theme } from '../src/config/theme.enum';
import { UnitTestResults } from '../src/contexts/unit-test.context';
import { RpgGamePageConfig } from '../src/rpg-game-page/rpg-game-page.config';
import App from '../pages/_app';

describe('<App/>', () => {
  let mockComponent: jest.Mock;

  let pageConfig: PageConfig;

  let unitTestResult: UnitTestResults;

  beforeEach(() => {
    mockComponent = jest.fn().mockReturnValue(<div>Component here</div>);

    pageConfig = {
      defaults: {
        font: Font.ARIAL,
        theme: Theme.MONOCHROME,
        animation: SlideAnimation.SWEEPY,
        developerMode: false,
      },
    };

    unitTestResult = {
      MockComponent: {
        numFailingTests: 0,
        numPassingTests: 2,
        tests: [
          {
            testName: 'renders',
            passed: true,
          },
          {
            testName: 'activates',
            passed: true,
          },
        ],
      },
    };
  });

  afterEach(() => {
    cleanup();
    jest.resetModules();

    pageDefaults = undefined;
  });

  function testChangingSettings(
    page: string,
    render: () => RenderResult
  ): void {
    test(`changes settings for ${page}`, async () => {
      const renderResult = render();

      let containerElement = renderResult.queryByTestId('page-container');

      expect(containerElement.classList.toString()).toBe(
        'page font-Arial theme-Monochrome'
      );

      loadFontReturnValue = Promise.resolve();

      let [args] = mockComponent.mock.calls[0];

      act(() => args.onFontChange(Font.EATER));

      waitForElementToBeRemoved(() =>
        renderResult.queryByText('Loading screen...')
      );

      containerElement = renderResult.queryByTestId('page-container');
      expect(containerElement.classList.toString()).toBe(
        'page font-Eater theme-Monochrome'
      );

      [args] = mockComponent.mock.calls[1];
      await act(() => args.onThemeChange(Theme.SEA));

      containerElement = renderResult.queryByTestId('page-container');
      expect(containerElement.classList.toString()).toBe(
        'page font-Eater theme-Sea'
      );
    });

    test(`initializes defaults for ${page}`, async () => {
      const config: PageConfig = {
        defaults: {
          font: Font.COMIC_SANS_MS,
          theme: Theme.ULYSSES,
          animation: SlideAnimation.SWOOPY,
          developerMode: true,
        },
      };

      pageDefaults = config;

      const renderResult = render();

      const containerElement = renderResult.queryByTestId('page-container');

      expect(containerElement.classList.toString()).toBe(
        'page font-ComicSansMS theme-Ulysses'
      );

      const developerModeOn = renderResult.queryByText('Developer mode: true');
      expect(developerModeOn).toBeTruthy();
    });
  }

  test('renders the fallback page', () => {
    const renderResult = render(
      <App Component={mockComponent} pageProps={{ statusCode: 404 }} />
    );

    const component = renderResult.queryByText('Component here');
    expect(component).toBeTruthy();

    const navigation = renderResult.queryByText('Navigation');
    expect(navigation).toBeFalsy();
  });

  describe('Homepage', () => {
    function renderHomepage(): RenderResult {
      return render(
        <App
          Component={mockComponent}
          pageProps={{
            locale: 'en',
            pageConfig,
            homepageConfig: {} as any,
            generatedProfilePictureUrl: '',
            profilePicturePrompt: '',
            unitTestResult,
          }}
        />
      );
    }

    test('renders the homepage', () => {
      const renderResult = renderHomepage();

      const component = renderResult.queryByText('Component here');
      expect(component).toBeTruthy();

      const navigation = renderResult.queryByText('Navigation here');
      expect(navigation).toBeTruthy();

      const openSettings = renderResult.queryByText('Open Settings');
      expect(openSettings).toBeFalsy();
    });

    testChangingSettings('homepage', renderHomepage);
  });

  describe('BuzzwordBingoPage', () => {
    function renderBuzzwordBingo(): RenderResult {
      return render(
        <App
          Component={mockComponent}
          pageProps={{
            locale: 'en',
            route: 'buzzword-bingo',
            pageConfig,
            buzzwordBingoConfig: {} as any,
            unitTestResult,
            openSettingsConfig: {} as any,
          }}
        />
      );
    }

    test('renders the buzzword bingo page', () => {
      const renderResult = renderBuzzwordBingo();

      const component = renderResult.queryByText('Component here');
      expect(component).toBeTruthy();

      const navigation = renderResult.queryByText('Navigation here');
      expect(navigation).toBeTruthy();

      const openSettings = renderResult.queryByText('Open Settings');
      expect(openSettings).toBeTruthy();
    });

    testChangingSettings('buzzword bingo', renderBuzzwordBingo);
  });

  describe('RpgGamePage', () => {
    function renderRpgGamePage(): RenderResult {
      return render(
        <App
          Component={mockComponent}
          pageProps={{
            locale: 'en',
            route: '',
            pageConfig,
            rpgGameConfig: {} as RpgGamePageConfig,
            openSettingsConfig: {} as any,
            unitTestResult,
          }}
        />
      );
    }

    test('renders the rpg page', () => {
      const renderResult = renderRpgGamePage();

      const component = renderResult.queryByText('Component here');
      expect(component).toBeTruthy();

      const navigation = renderResult.queryByText('Navigation here');
      expect(navigation).toBeTruthy();

      const openSettings = renderResult.queryByText('Open Settings');
      expect(openSettings).toBeTruthy();
    });

    testChangingSettings('rpg game', renderRpgGamePage);
  });
});

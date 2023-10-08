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

jest.mock('../src/contexts/unit-test/unit-test.context', () => ({
  Provider: ({ children, value }) => (
    <div>
      <span>Developer mode: {value.developerMode?.toString()}</span>
      {children}
    </div>
  ),
}));

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

jest.mock('../src/config/load-font.function', () =>
  jest.fn().mockImplementation(() => loadFontReturnValue)
);

import Page from '../src/page';
jest.mock('next/dynamic', () => () => Page);

import {
  act,
  cleanup,
  render,
  RenderResult,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import PageConfig from '../src/models/page-config.model';
import App from '../pages/_app';
import Font from '../src/models/font.enum';
import Theme from '../src/models/theme.enum';
import SlideAnimation from '../src/models/slide-animation.enum';
import { UnitTestResults } from '../src/contexts/unit-test/unit-test-results.model';

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
      navigationLinks: [],
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

  async function testChangingSettings(
    page: string,
    render: () => Promise<RenderResult>
  ): Promise<void> {
    test(`initializes defaults for ${page}`, async () => {
      const config: PageConfig = {
        defaults: {
          font: Font.COMIC_SANS_MS,
          theme: Theme.ULYSSES,
          animation: SlideAnimation.SWOOPY,
          developerMode: true,
        },
        navigationLinks: [],
      };

      pageDefaults = config.defaults;

      const renderResult = await act(render);

      const containerElement = renderResult.queryByTestId('page-container');

      expect(containerElement.classList.toString()).toBe(
        'page font-ComicSansMS theme-Ulysses animation-Swoopy'
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
    async function renderHomepage(): Promise<RenderResult> {
      return render(
        <App
          Component={mockComponent}
          pageProps={{
            locale: 'en',
            route: '',
            pageConfig,
            homepageConfig: {} as any,
            generatedProfilePictureUrl: '',
            profilePicturePrompt: '',
            unitTestResult,
            apiUrl: 'http://api.example.com',
          }}
        />
      );
    }

    test('renders the homepage', async () => {
      const renderResult = await act(renderHomepage);

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
    async function renderBuzzwordBingo(): Promise<RenderResult> {
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
            apiUrl: 'http://api.example.com',
          }}
        />
      );
    }

    test('renders the buzzword bingo page', async () => {
      const renderResult = await act(renderBuzzwordBingo);

      const component = renderResult.queryByText('Component here');
      expect(component).toBeTruthy();

      const navigation = renderResult.queryByText('Navigation here');
      expect(navigation).toBeTruthy();

      const openSettings = renderResult.queryByText('Open Settings');
      expect(openSettings).toBeTruthy();
    });

    testChangingSettings('buzzword bingo', renderBuzzwordBingo);
  });
});

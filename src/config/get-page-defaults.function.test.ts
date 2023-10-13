import Font from '../models/font.enum';
import SlideAnimation from '../models/slide-animation.enum';
import Theme from '../models/theme.enum';
import { getPageDefaults, setPageDefaults } from './get-page-defaults.function';

describe('getPageDefaults() and setPageDefaults()', () => {
  afterEach(() => {
    jest.resetModules();
  });

  test('gets and sets values into storage', () => {
    expect(getPageDefaults()).toBeNull();

    const defaults = {
      font: Font.COMIC_SANS_MS,
      theme: Theme.ULYSSES,
      animation: SlideAnimation.MARQUEE,
      developerMode: true,
    };

    setPageDefaults(defaults);

    expect(getPageDefaults()).toEqual(defaults);
  });
});

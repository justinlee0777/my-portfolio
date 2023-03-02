import { Font } from './font.enum';
import { getPageDefaults, setPageDefaults } from './get-page-defaults.function';
import { SlideAnimation } from './slide-animation.enum';
import { Theme } from './theme.enum';

describe('getPageDefaults() and setPageDefaults()', () => {
  test('gets and sets values into storage', () => {
    expect(getPageDefaults()).toBeNull();

    const defaults = {
      defaults: {
        font: Font.COMIC_SANS_MS,
        theme: Theme.ULYSSES,
        animation: SlideAnimation.MARQUEE,
      },
    };

    setPageDefaults(defaults);

    expect(getPageDefaults()).toEqual(defaults);
  });
});

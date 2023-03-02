import { Font } from './font.enum';
import { getFontUrl, loadFont } from './load-font.function';

describe('loadFont()', () => {
  let savedFont: Font;
  let savedUrl: string;

  let addedFonts = [];

  let loadCalled = false;
  class MockFontFace {
    constructor(font: Font, url: string) {
      savedFont = font;
      savedUrl = url;
    }

    load = jest.fn().mockImplementationOnce(() => {
      loadCalled = true;
      return Promise.resolve(undefined);
    });
  }
  global.FontFace = <any>MockFontFace;

  (<any>document.fonts) = {
    add: jest
      .fn()
      .mockImplementationOnce((fontFace) => addedFonts.push(fontFace)),
  };

  afterEach(() => {
    jest.resetModules();
  });

  test('loads a font', async () => {
    await loadFont(Font.ROBOTO);

    expect(savedFont).toBe(Font.ROBOTO);
    expect(savedUrl).toMatch(/url\(.*\)/);

    expect(addedFonts.length).toBe(1);

    expect(loadCalled).toBe(true);
  });
});

describe('getFontUrl()', () => {
  test('gets the font URL if the font is not provided in the browser', () => {
    expect(() => getFontUrl(Font.ARIAL)).toThrow('No font url for Arial');

    expect(() => getFontUrl(Font.COMIC_SANS_MS)).toThrow(
      'No font url for Comic Sans MS'
    );

    expect(() => getFontUrl(Font.ROBOTO)).toBeTruthy();
  });
});

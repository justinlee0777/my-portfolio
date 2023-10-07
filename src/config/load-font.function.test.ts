import Font from '../models/font.enum';
import loadFont from './load-font.function';

describe('loadFont()', () => {
  let savedFont: Font;
  let savedUrl: string;

  let addedFonts: Array<FontFace>;

  let loadCalled = false;
  class MockFontFace {
    weight;
    style;

    constructor(public family: Font, public url: string, public descriptors) {
      savedFont = family;
      savedUrl = url;

      this.weight = descriptors?.weight;
      this.style = descriptors?.style;
    }

    load = jest.fn().mockImplementationOnce(() => {
      loadCalled = true;
      return Promise.resolve(undefined);
    });
  }
  global.FontFace = <any>MockFontFace;

  beforeEach(() => {
    addedFonts = [];

    (<any>document.fonts) = {
      add: jest
        .fn()
        .mockImplementation((fontFace) => addedFonts.push(fontFace)),
    };
  });

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

  test('loads multiple font', async () => {
    await loadFont(Font.BOOKERLY);

    expect(savedFont).toBe(Font.BOOKERLY);

    expect(addedFonts.length).toBe(3);

    expect(addedFonts.map((font) => font.family)).toEqual(
      Array(3).fill('Bookerly')
    );

    expect(addedFonts[1].weight).toBe('bold');
    expect(addedFonts[2].style).toBe('italic');

    expect(loadCalled).toBe(true);
  });
});

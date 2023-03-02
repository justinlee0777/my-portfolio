import { Font } from './font.enum';
import { getFontUrl } from './load-font.function';

test('gets the font URL if the font is not provided in the browser', () => {
  expect(() => getFontUrl(Font.ARIAL)).toThrow('No font url for Arial');

  expect(() => getFontUrl(Font.COMIC_SANS_MS)).toThrow(
    'No font url for Comic Sans MS'
  );

  expect(() => getFontUrl(Font.ROBOTO)).toBeTruthy();
});

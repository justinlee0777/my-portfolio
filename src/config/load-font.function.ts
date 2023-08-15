import { Font } from './font.enum';

export function loadFont(font: Font): Promise<void> {
  const fontUrl = getFontUrl(font);
  const additionalFontUrls = getAdditionalFontSources(font);

  const loadFonts = [[null, fontUrl], ...additionalFontUrls].map(
    ([descriptor, url]: [FontFaceDescriptors, string]) => {
      const fontFace = new FontFace(font, `url(${url})`, descriptor);

      document.fonts.add(fontFace);

      return fontFace.load();
    }
  );

  return Promise.all(loadFonts).then();
}

export function getFontUrl(font: Font): string {
  switch (font) {
    case Font.BOOKERLY:
      return '/Bookerly/Bookerly-Regular.ttf';
    case Font.ROBOTO:
      return 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu7mxKKTU1Kvnz.woff2';
    case Font.TILT_PRISM:
      return 'https://fonts.gstatic.com/s/tiltprism/v5/5h11iZgyPHoZ3YikNzWGfWey2dCAZXT-bH9V4VGn-FJ7tLI25oc_rIbApj6svcudKsLN.woff';
    case Font.EATER:
      return 'https://fonts.gstatic.com/s/eater/v21/mtG04_FCK7bOvquxsXBSsmsQ.woff2';
    default:
      throw new Error(`No font url for ${font}`);
  }
}

export function getAdditionalFontSources(
  font: Font
): Array<[FontFaceDescriptors, string]> {
  switch (font) {
    case Font.BOOKERLY:
      return [
        [{ weight: 'bold' }, '/Bookerly/Bookerly-Bold.ttf'],
        [{ style: 'italic' }, '/Bookerly/Bookerly-Italic.ttf'],
      ];
    default:
      return [];
  }
}

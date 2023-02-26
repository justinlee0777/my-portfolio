import { Font } from './font.enum';

export function loadFont(font: Font): Promise<void> {
  const fontUrl = getFontUrl(font);
  const fontFace = new FontFace(font, `url(${fontUrl})`);

  document.fonts.add(fontFace);

  return fontFace.load().then();
}

export function getFontUrl(font: Font): string {
  switch (font) {
    case Font.ROBOTO:
      return 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu7mxKKTU1Kvnz.woff2';
    default:
      throw new Error(`No font url for ${font}`);
  }
}

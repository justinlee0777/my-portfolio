import Font from '../models/font.enum';
import getAdditionalFontSources from './get-additional-font-sources.function';
import getFontUrl from './get-font-url.function';

export default function loadFont(font: Font): Promise<void> {
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

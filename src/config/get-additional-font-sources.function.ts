import Font from '../models/font.enum';

export default function getAdditionalFontSources(
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

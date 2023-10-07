import Font from '../models/font.enum';

export default function needsLoading(font: Font): boolean {
  switch (font) {
    case Font.BOOKERLY:
    case Font.ROBOTO:
    case Font.TILT_PRISM:
    case Font.EATER:
      return true;
    default:
      return false;
  }
}

import Font from '../models/font.enum';

export default function getFontUrl(font: Font): string {
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

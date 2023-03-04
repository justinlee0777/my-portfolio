export enum Font {
  ARIAL = 'Arial',
  ROBOTO = 'Roboto',
  COMIC_SANS_MS = 'Comic Sans MS',
  TILT_PRISM = 'Tilt Prism',
  EATER = 'Eater',
}

export function needsLoading(font: Font): boolean {
  switch (font) {
    case Font.ROBOTO:
    case Font.TILT_PRISM:
    case Font.EATER:
      return true;
    default:
      return false;
  }
}

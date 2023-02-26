export enum Font {
  ARIAL = 'Arial',
  ROBOTO = 'Roboto',
  COMIC_SANS_MS = 'Comic Sans MS',
}

export function needsLoading(font: Font): boolean {
  switch (font) {
    case Font.ROBOTO:
      return true;
    default:
      return false;
  }
}

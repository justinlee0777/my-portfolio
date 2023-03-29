export default async function animateBlock(
  element: HTMLElement
): Promise<void> {
  const cover = document.createElement('div');
  cover.style.display = 'flex';
  cover.style.flexDirection = 'column';
  cover.style.position = 'absolute';
  cover.style.top = '0';
  cover.style.left = '0';
  cover.style.height = '100%';
  cover.style.width = '100%';

  const rows = 3;

  const tileHeight = element.clientHeight / 3;

  const animations: Array<() => Promise<void>> = [];

  for (let i = 0; i < rows; i++) {
    const tile = document.createElement('div');
    tile.style.height = `${tileHeight}px`;
    tile.style.transition = `${1000 / 60}ms opacity`;
    tile.style.transform = 'translateX(0)';
    tile.style.backgroundColor = 'white';

    cover.appendChild(tile);

    animations.push(() =>
      tile
        .animate(
          [{ transform: 'translateX(0)' }, { transform: 'translateX(100%)' }],
          2000 / rows
        )
        .finished.then(() => (tile.style.transform = 'translateX(100%)'))
        .then()
    );
  }

  element.appendChild(cover);

  for (const animation of animations) {
    await animation();
  }

  element.removeChild(cover);
}

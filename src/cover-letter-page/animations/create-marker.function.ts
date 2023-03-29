export function createMarker(): HTMLElement {
  const marker = document.createElement('div');
  marker.style.display = 'inline-block';
  marker.style.borderRadius = '2px';
  marker.style.width = '1em';
  marker.style.backgroundColor = 'lightgrey';
  marker.textContent = ' ';

  marker.animate(
    [
      { backgroundColor: 'lightgrey' },
      { backgroundColor: 'white' },
      { backgroundColor: 'lightgrey' },
    ],
    { duration: 1000, iterations: Infinity }
  );

  return marker;
}

export async function animateElement(element: HTMLElement): Promise<void> {
  switch (element.tagName) {
    case 'P':
      return animateParagraph(element);
    case 'DIV':
      return animateBlock(element);
    default:
      return Promise.resolve();
  }
}

/**
 * Wipes out text from element and iteratively fills it in.
 */
async function animateParagraph(element: HTMLElement): Promise<void> {
  const previousHeight = element.clientHeight;
  const cachedTextContent = element.textContent;
  const textLength = cachedTextContent.length;

  element.style.height = `${previousHeight}px`;

  element.textContent = '';

  return new Promise((resolve) => {
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

    let i = 0;

    const intervalId = setInterval(() => {
      if (i > textLength) {
        clearInterval(intervalId);

        element.style.height = null;
        element.removeChild(marker);

        return resolve(undefined);
      }

      element.innerHTML = cachedTextContent.slice(0, i);
      element.appendChild(marker);

      i++;
    }, 1000 / 60);
  });
}

async function animateBlock(element: HTMLElement): Promise<void> {
  return element
    .animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], 1000)
    .finished.then();
}

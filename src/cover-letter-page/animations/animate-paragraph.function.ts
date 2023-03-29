import { createMarker } from './create-marker.function';

/**
 * Wipes out text from element and iteratively fills it in.
 */
export default async function animateParagraph(
  element: HTMLElement
): Promise<void> {
  const previousHeight = element.clientHeight;
  const cachedTextContent = element.textContent;
  const textLength = cachedTextContent.length;

  element.style.height = `${previousHeight}px`;

  element.textContent = '';

  return new Promise((resolve) => {
    const marker = createMarker();

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

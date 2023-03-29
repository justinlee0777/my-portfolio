import { AnimateElement } from './animate-element.function';
import { createMarker } from './create-marker.function';

/**
 * Wipes out text from element and iteratively fills it in.
 */
const animateParagraph: AnimateElement = async function (
  element,
  terminateEarly
) {
  const previousHeight = element.clientHeight;
  const cachedInnerHTML = element.innerHTML;
  const cachedTextContent = element.textContent;
  const textLength = cachedTextContent.length;

  element.style.height = `${previousHeight}px`;

  element.textContent = '';

  return new Promise((resolve) => {
    const marker = createMarker();

    let i = 0;

    const intervalId = setInterval(() => {
      if (i > textLength || terminateEarly?.()) {
        clearInterval(intervalId);

        element.style.height = null;

        try {
          element.removeChild(marker);
        } catch {}

        return resolve(undefined);
      }

      element.innerHTML = cachedTextContent.slice(0, i);
      element.appendChild(marker);

      i++;
    }, 1000 / 60);
  }).then(() => () => (element.innerHTML = cachedInnerHTML));
};

export default animateParagraph;

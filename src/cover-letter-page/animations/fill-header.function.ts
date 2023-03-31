/**
 * @params offsetInWords which indicates when to notify the client when to start their own animation. The offset is in words -
 *   it is expected that the string in "headerElement" has more words than passed into "offsetInWords".
 * @returns 2-tuple - 1st fires when the client should start their own animation, 2nd fires when the animation is completely finished.
 */
export function fillHeader(
  headerElement: HTMLElement,
  textContent: string
): [Promise<void>, Promise<void>] {
  let resolveNotifyClient: Function;
  const notifyClient = new Promise<void>(
    (resolve) => (resolveNotifyClient = resolve)
  );

  const childElements = getElements(textContent);

  const animationDone = new Promise<void>(async (resolve) => {
    for (const childElement of childElements) {
      if (childElement.nodeName === '#text') {
        await fillIn(headerElement, childElement.textContent);
      } else {
        const cachedTextContent = childElement.textContent;
        childElement.textContent = '';

        headerElement.appendChild(childElement);

        resolveNotifyClient();

        await fillIn(childElement as HTMLElement, cachedTextContent);
      }
    }

    resolve();
  });

  return [notifyClient, animationDone];
}

async function fillIn(
  container: HTMLElement,
  textContent: string
): Promise<void> {
  const textLength = textContent.length;
  let i = 0;

  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      if (i >= textLength) {
        clearInterval(intervalId);
        return resolve(undefined);
      }

      container.innerHTML += textContent[i];

      i++;
    }, 100);
  });
}

function getElements(htmlString: string): Array<Node> {
  const container = document.createElement('div');
  container.innerHTML = htmlString;

  return [...container.childNodes];
}

export async function animateCoverLetter(
  paragraphs: Array<HTMLParagraphElement>
): Promise<void> {
  const sequence = paragraphs.map((paragraph) => {
    const previousHeight = paragraph.clientHeight;
    const cachedTextContent = paragraph.textContent;
    const textLength = cachedTextContent.length;

    paragraph.style.height = `${previousHeight}px`;

    paragraph.textContent = '';

    return () =>
      new Promise((resolve) => {
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

            paragraph.setAttribute('animation-finished', undefined);
            paragraph.style.height = null;
            paragraph.removeChild(marker);

            return resolve(undefined);
          }

          paragraph.innerHTML = cachedTextContent.slice(0, i);
          paragraph.appendChild(marker);

          i++;
        }, 1000 / 60);
      });
  });

  for (const next of sequence) {
    await next();
  }
}

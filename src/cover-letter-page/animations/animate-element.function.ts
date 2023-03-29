import animateBlock from './animate-block.function';
import animateParagraph from './animate-paragraph.function';

/**
 * @returns cleanup
 */
export default async function animateElement(
  element: HTMLElement
): Promise<() => void> {
  const noop = () => {};
  switch (element.tagName) {
    case 'P':
      return animateParagraph(element);
    case 'DIV':
      return animateBlock(element).then(() => noop);
    default:
      return Promise.resolve(noop);
  }
}

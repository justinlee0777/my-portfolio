import animateBlock from './animate-block.function';
import animateParagraph from './animate-paragraph.function';

export default async function animateElement(
  element: HTMLElement
): Promise<void> {
  switch (element.tagName) {
    case 'P':
      return animateParagraph(element);
    case 'DIV':
      return animateBlock(element);
    default:
      return Promise.resolve();
  }
}

import animateBlock from './animate-block.function';
import animateParagraph from './animate-paragraph.function';

export interface AnimateElement {
  /**
   * @returns cleanup
   */
  (element: HTMLElement, terminateEarly?: () => boolean): Promise<() => void>;
}

const animateElement: AnimateElement = async function (
  element: HTMLElement,
  terminateEarly?: () => boolean
): Promise<() => void> {
  const noop = () => {};
  switch (element.tagName) {
    case 'P':
      return animateParagraph(element, terminateEarly);
    case 'DIV':
      return animateBlock(element, terminateEarly);
    default:
      return Promise.resolve(noop);
  }
};

export default animateElement;

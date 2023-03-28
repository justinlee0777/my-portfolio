import { useEffect } from 'react';
import { animateElement } from './animate-cover-letter.function';

type GetNextElement = (parentElement: HTMLElement) => Array<HTMLElement>;
type GetNextElementAsync = GetNextElement | Promise<GetNextElement>;

export async function useCoverLetterAnimation(
  parentElement: HTMLElement | null,
  sequence: Array<GetNextElementAsync>
): Promise<void> {
  useEffect(() => {
    if (parentElement) {
      run();
    }
  }, [parentElement]);

  async function run(): Promise<void> {
    for (const next of sequence) {
      let getNextElement: GetNextElement;
      if (typeof next === 'function') {
        getNextElement = next;
      } else {
        getNextElement = await next;
      }

      const elements = getNextElement(parentElement);

      for (const element of elements) {
        element.setAttribute('data-activated', '');
        await animateElement(element);
      }
    }
  }
}

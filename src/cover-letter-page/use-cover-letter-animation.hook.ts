import { useCallback, useMemo } from 'react';

import animateElement from './animations/animate-element.function';

type GetNextElement = (parentElement: HTMLElement) => Array<HTMLElement>;
type GetNextElementAsync = GetNextElement | Promise<GetNextElement>;

/**
 * @returns a Promise indicating that the animation is finished and a callback that allows the user to terminate the animation early.
 */
export function useCoverLetterAnimation(
  parentElement: HTMLElement | null,
  sequence: Array<GetNextElementAsync>
): [() => void, Promise<void>?] {
  let terminationFlag = false;
  const terminateEarly = useCallback(() => terminationFlag, []);

  const animationFinished = useMemo(() => {
    if (parentElement) {
      return run(terminateEarly);
    }
  }, [parentElement]);

  return [useCallback(() => (terminationFlag = true), []), animationFinished];

  async function run(terminateEarly: () => boolean): Promise<void> {
    const postcleanup: Array<() => void> = [];

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
        const postOp = await animateElement(element, terminateEarly);

        postcleanup.push(postOp);
      }
    }

    postcleanup.forEach((op) => op());
  }
}

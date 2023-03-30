import { useEffect, useState } from 'react';

import { fillHeader } from './animations/fill-header.function';

/**
 * @returns a 3-tuple: 1st starts the animation, 2nd is whether the content animation should start, 3rd is whether the header animation has fully ended.
 */
export function useHeaderAnimation(
  headerElement: HTMLElement | undefined,
  textContent: string
): [() => void, boolean, boolean] {
  const [headerAnimationBegun, setHeaderAnimationBegun] = useState(false);
  const [headerAnimationEnd, setHeaderAnimationEnd] = useState(false);
  const [contentAnimationBegun, setContentAnimationBegun] = useState(false);

  useEffect(() => {
    if (!(headerAnimationBegun && headerElement)) {
      return;
    }

    runAnimation();
  }, [headerAnimationBegun, headerElement, textContent]);

  return [
    () => setHeaderAnimationBegun(true),
    contentAnimationBegun,
    headerAnimationEnd,
  ];

  async function runAnimation() {
    const [beginContentAnimation, endHeaderAnimation] = fillHeader(
      headerElement,
      textContent
    );

    await beginContentAnimation;

    setContentAnimationBegun(true);

    await endHeaderAnimation;

    setHeaderAnimationEnd(true);
  }
}

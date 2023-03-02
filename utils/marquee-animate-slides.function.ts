/**
 * @param htmlElements to animate infinitely until the animation is destroyed. They will move across the screen end to end as if traveling through a weird void.
 */
export function marqueeAnimateSlides(
  htmlElements: Array<HTMLElement>
): (() => void) | undefined {
  let stopAnimation = false;

  const destroyFns: Array<() => void> = [];

  htmlElements.forEach(async (child: HTMLElement, i) => {
    const modifier = i % 2 === 0 ? -1 : 1;
    let animation: Animation | undefined;
    let stopped = false;

    const toggleAnimationState = () => {
      stopped ? animation?.play() : animation?.pause();
      stopped = !stopped;
    };

    child.addEventListener('click', toggleAnimationState);

    destroyFns.push(() => {
      animation?.finish();
      child.removeEventListener('click', toggleAnimationState);
    });

    while (!stopAnimation) {
      animation = child.animate(
        [
          {
            transform: 'translate(0)',
          },
          {
            transform: `translate(${modifier * 100}%)`,
          },
        ],
        { duration: 10000 }
      );

      await animation.finished;

      animation = child.animate(
        [
          {
            transform: `translate(${modifier * -100}%)`,
          },
          {
            transform: 'translate(0)',
          },
        ],
        { duration: 10000 }
      );

      await animation.finished;
    }
  });

  return () => {
    stopAnimation = true;
    destroyFns.forEach((destroyFn) => destroyFn());
  };
}

import SlideAnimation from '../models/slide-animation.enum';

export interface AnimatedSlides {
  [slideId: string]: boolean;
}

export interface AnimatedSlidesState {
  get: AnimatedSlides;
  set: (slides: AnimatedSlides) => void;
}

export function animateSlides(
  animation: SlideAnimation,
  slides: Array<HTMLElement>,
  state: AnimatedSlidesState
): (() => void) | undefined {
  switch (animation) {
    case SlideAnimation.SWEEPY:
    case SlideAnimation.SWOOPY:
      // Animating slides when the user scrolls over them
      return watchSlides(slides, state);
    case SlideAnimation.MARQUEE:
      // Animate infinitely but stop them when the user hovers over elements.
      return marqueeAnimateSlides(slides);
  }
}

function watchSlides(
  slides: Array<HTMLElement>,
  state: AnimatedSlidesState
): () => void {
  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      let animatedSlides = state.get;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animatedSlides = {
            ...animatedSlides,
            [entry.target.id]: true,
          };
        }
      });

      state.set(animatedSlides);
    },
    { threshold: 0.4 }
  );

  slides.forEach((child: HTMLElement) => {
    if (!state.get[child.id]) {
      intersectionObserver.observe(child as HTMLElement);
    }
  });

  return () => intersectionObserver.disconnect();
}

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

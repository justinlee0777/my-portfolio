export enum SlideAnimation {
  NONE = 'None',
  SWOOPY = 'Swoopy',
  SWEEPY = 'Sweepy',
  // SCROLL_HIJACK = 'Scroll Hijack',
}

export function isFancyAnimation(animation: SlideAnimation): boolean {
  return animation !== SlideAnimation.NONE;
}

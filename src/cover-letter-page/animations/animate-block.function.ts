export default async function animateBlock(
  element: HTMLElement
): Promise<void> {
  return element
    .animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], 1000)
    .finished.then();
}

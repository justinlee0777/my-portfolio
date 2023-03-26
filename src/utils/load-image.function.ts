export async function loadImage(imageUrl: string): Promise<void> {
  // Load inline image early
  const image = new Image();

  const imageLoaded = new Promise((resolve) => (image.onload = resolve));

  image.src = imageUrl;

  await imageLoaded;
}

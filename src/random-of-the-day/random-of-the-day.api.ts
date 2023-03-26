import { loadImage } from '../utils/load-image.function';
import { Fact } from './fact.interface';
import { Painting } from './painting.interface';
import { Poem } from './poem.interface';

export async function getPoem(apiUrl: string): Promise<Poem> {
  const response = await fetch(`${apiUrl}/poem`);
  return response.json();
}

export async function getFact(apiUrl: string): Promise<Fact> {
  const response = await fetch(`${apiUrl}/fact`);
  return response.json();
}

export async function getPainting(apiUrl: string): Promise<Painting> {
  const response = await fetch(`${apiUrl}/painting`);

  const painting: Painting = await response.json();

  await loadImage(painting.images.inline);

  return painting;
}

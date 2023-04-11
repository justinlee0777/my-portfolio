import { failHttpResponse } from '../utils/fail-http-response.function';
import { loadImage } from '../utils/load-image.function';
import { Fact } from './fact.interface';
import { ObliqueStrategy } from './oblique-strategy.interface';
import { Painting } from './painting.interface';
import { Poem } from './poem.interface';

export async function getPoem(apiUrl: string): Promise<Poem> {
  const response = await fetch(`${apiUrl}/poem`);
  failHttpResponse(response);
  return response.json();
}

export async function getFact(apiUrl: string): Promise<Fact> {
  const response = await fetch(`${apiUrl}/fact`);
  failHttpResponse(response);
  return response.json();
}

export async function getPainting(apiUrl: string): Promise<Painting> {
  const response = await fetch(`${apiUrl}/painting`);
  failHttpResponse(response);
  const painting: Painting = await response.json();

  await loadImage(painting.images.inline);

  return painting;
}

export async function getObliqueStrategy(
  apiUrl: string
): Promise<ObliqueStrategy> {
  const response = await fetch(`${apiUrl}/oblique-strategy`);
  failHttpResponse(response);
  return response.json();
}

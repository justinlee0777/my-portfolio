import { failHttpResponse } from '../../utils/fail-http-response.function';
import { loadImage } from '../../utils/load-image.function';
import { Painting } from '../models/painting.interface';

export default async function getPainting(apiUrl: string): Promise<Painting> {
  const response = await fetch(`${apiUrl}/painting`);
  failHttpResponse(response);
  const painting: Painting = await response.json();

  await loadImage(painting.images.inline);

  return painting;
}

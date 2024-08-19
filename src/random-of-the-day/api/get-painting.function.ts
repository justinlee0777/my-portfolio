import { Painting } from '../../models/painting.interface';
import { failHttpResponse } from '../../utils/fail-http-response.function';
import { loadImage } from '../../utils/load-image.function';

export default async function getPainting(): Promise<Painting> {
  const response = await fetch(`/api/painting`);
  failHttpResponse(response);
  const painting: Painting = await response.json();

  await loadImage(painting.images.inline);

  return painting;
}

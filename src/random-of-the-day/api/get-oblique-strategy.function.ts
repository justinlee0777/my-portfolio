import { failHttpResponse } from '../../utils/fail-http-response.function';
import { ObliqueStrategy } from '../models/oblique-strategy.interface';

export default async function getObliqueStrategy(
  apiUrl: string
): Promise<ObliqueStrategy> {
  const response = await fetch(`${apiUrl}/oblique-strategy`);
  failHttpResponse(response);
  return response.json();
}

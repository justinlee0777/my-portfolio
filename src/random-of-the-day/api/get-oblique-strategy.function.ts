import { ObliqueStrategy } from '../../models/oblique-strategy.interface';
import { failHttpResponse } from '../../utils/fail-http-response.function';

export default async function getObliqueStrategy(): Promise<ObliqueStrategy> {
  const response = await fetch(`/api/oblique-strategy`);
  failHttpResponse(response);
  return response.json();
}

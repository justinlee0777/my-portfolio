import FrogSound from '../../models/frog-sound';
import { failHttpResponse } from '../../utils/fail-http-response.function';

export default async function getFrogSound(): Promise<FrogSound> {
  const response = await fetch(`/api/frog-sound`);
  failHttpResponse(response);
  return response.json();
}

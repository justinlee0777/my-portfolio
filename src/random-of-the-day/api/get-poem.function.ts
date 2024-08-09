import { Poem } from '../../models/poem.interface';
import { failHttpResponse } from '../../utils/fail-http-response.function';

export default async function getPoem(): Promise<Poem> {
  const response = await fetch(`/api/poem`);
  failHttpResponse(response);
  return response.json();
}

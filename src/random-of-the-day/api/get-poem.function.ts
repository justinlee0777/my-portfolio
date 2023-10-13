import { failHttpResponse } from '../../utils/fail-http-response.function';
import { Poem } from '../models/poem.interface';

export default async function getPoem(apiUrl: string): Promise<Poem> {
  const response = await fetch(`${apiUrl}/poem`);
  failHttpResponse(response);
  return response.json();
}

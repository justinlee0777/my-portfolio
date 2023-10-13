import { failHttpResponse } from '../../utils/fail-http-response.function';
import { Fact } from '../models/fact.interface';

export default async function getFact(apiUrl: string): Promise<Fact> {
  const response = await fetch(`${apiUrl}/fact`);
  failHttpResponse(response);
  return response.json();
}

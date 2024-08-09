import { Fact } from '../../models/fact.interface';
import { failHttpResponse } from '../../utils/fail-http-response.function';

export default async function getFact(): Promise<Fact> {
  const response = await fetch(`/api/fact`);
  failHttpResponse(response);
  return response.json();
}

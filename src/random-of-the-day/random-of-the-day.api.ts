import { Fact } from './fact.interface';
import { Poem } from './poem.interface';

export async function getPoem(apiUrl: string): Promise<Poem> {
  const response = await fetch(`${apiUrl}/poem`);
  return response.json();
}

export async function getFact(apiUrl: string): Promise<Fact> {
  const response = await fetch(`${apiUrl}/fact`);
  return response.json();
}

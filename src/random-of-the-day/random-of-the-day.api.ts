import { Poem } from './poem.interface';

export async function getPoem(apiUrl: string): Promise<Poem> {
  const response = await fetch(`${apiUrl}/poem`);
  return response.json();
}

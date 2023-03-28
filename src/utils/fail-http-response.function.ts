/**
 * @throws if the response indicates an error on the client or server side.
 */
export function failHttpResponse(response: Response): void {
  if (!response.ok) {
    throw new Error(`Request failed with status code ${response.status}.`);
  }
}

import { failHttpResponse } from '../utils/fail-http-response.function';
import { markdownToHtmlString } from '../utils/markdown-to-html-string.function';

export async function getCompanySpecificCoverLetter(
  apiUrl: string,
  companyId = 'default'
): Promise<string> {
  const response = await fetch(`${apiUrl}/cover-letter/${companyId}`);
  failHttpResponse(response);

  const markdownContent = await response.text();

  return markdownToHtmlString(markdownContent);
}

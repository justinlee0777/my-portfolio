import { remark } from 'remark';
import html from 'remark-html';

import { failHttpResponse } from '../utils/fail-http-response.function';

export async function getCompanySpecificCoverLetter(
  apiUrl: string,
  companyId = 'default'
): Promise<string> {
  const response = await fetch(`${apiUrl}/cover-letter/${companyId}`);
  failHttpResponse(response);

  const markdownContent = await response.text();

  return remark()
    .use(html, { sanitize: false })
    .process(markdownContent)
    .then((content) => content.toString());
}

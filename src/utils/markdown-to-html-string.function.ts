import { remark } from 'remark';
import html from 'remark-html';

export async function markdownToHtmlString(markdown: string): Promise<string> {
  return remark()
    .use(html)
    .process(markdown)
    .then((content) => {
      return content.toString();
    });
}

import LinkedString from '../models/linked-string.model';

export default function createLinkElement(link: LinkedString): string {
  const pattern = /\$\{.*?\}/g;

  let index = 0;
  return link.templateString.replaceAll(pattern, (searchTerm) => {
    const url = link.urls[index] ?? '';
    const text = searchTerm.replace(/[\$\{\}]/g, '');

    const htmlString = `<a href="${url}" rel="noopener noreferrer" target="_blank">${text}</a>`;

    index++;

    return htmlString;
  });
}

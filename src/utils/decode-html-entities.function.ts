export function decodeHTMLEntities(encodedString: string): string {
  const htmlEntity = /&#(\d+);/g;

  return encodedString.replace(htmlEntity, (_, code) =>
    String.fromCharCode(code)
  );
}

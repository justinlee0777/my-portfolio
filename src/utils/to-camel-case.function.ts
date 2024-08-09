import capitalize from 'lodash-es/capitalize';

export default function toCamelCase(str: string, delimiter: string): string {
  const parts = str.split(delimiter);

  return parts.at(0) + parts.slice(1).map(capitalize);
}

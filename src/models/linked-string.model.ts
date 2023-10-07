export default interface LinkedString {
  /** Use ${link text content} to replace with links. The number of ${link text content} should be equal to the number of elements in the 'urls', and the order should be the same. */
  templateString: string;
  urls: Array<string>;
}

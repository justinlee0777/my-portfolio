/**
 * https://github.com/langchain-ai/langchainjs/blob/160c83c29e5000252bc4fa54bce41b4008f573f8/libs/langchain-mongodb/src/vectorstores.ts#L52
 */
export default function fixArrayPrecision(array: number[]): Array<number> {
  return array.map((value) => {
    if (Number.isInteger(value)) {
      return value + 0.000000000000001;
    }
    return value;
  });
}

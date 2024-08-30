export default function weightedReciprocalRank<T extends { text: string }>(
  lists: Array<Array<T>>,
  weights: Array<number>,
  threshold = 0.15
): Array<T> {
  if (lists.length !== weights.length) {
    throw new Error(
      'Number of rank lists must be equal to the number of weights.'
    );
  }

  const { length } = lists;

  const scores: { [text: string]: { item: T; score: number } } = {};

  for (let i = 0; i < length; i++) {
    const list = lists[i];
    const weight = weights[i];

    for (let j = 0; j < list.length; j++) {
      const item = list[j];

      const score = weight / j;

      if (item.text in scores) {
        scores[item.text].score += score;
      } else {
        scores[item.text] = { item, score };
      }
    }
  }

  return Object.values(scores)
    .sort((a, b) => b.score - a.score)
    .filter(({ score }) => score > threshold)
    .map(({ item }) => item);
}

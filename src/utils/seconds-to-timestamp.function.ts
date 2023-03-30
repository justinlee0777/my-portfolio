export default function secondsToTimestamp(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const overflowSeconds = Math.floor(seconds % 60);

  return `${minutes}:${overflowSeconds.toString().padEnd(2)}`;
}

import { MusingFiles } from '../musings/get-musings-from-files.function';

export async function getStaticPaths() {
  const musings = await MusingFiles.getMusingsFromFiles();

  return {
    paths: [
      ...musings.map((musing) => ({
        params: {
          musing: musing.slug,
        },
      })),
    ],
    fallback: false,
  };
}

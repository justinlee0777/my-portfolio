import { createImage } from '../api/openai';

export { default } from '../homepage/index';

export async function getStaticProps() {
  const generatedProfilePictureUrl = await createImage({
    prompt: 'A photo of Justin Lee, a web developer',
    size: '256x256',
  });

  return {
    props: {
      generatedProfilePictureUrl,
    },
  };
}

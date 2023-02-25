import { createImage } from '../api/openai';

export { default } from '../homepage/index';

export async function getStaticProps() {
  const profilePicturePrompt = 'A photo of Justin Lee, a web developer';

  const generatedProfilePictureUrl = await createImage({
    prompt: profilePicturePrompt,
    size: '256x256',
  });

  return {
    props: {
      generatedProfilePictureUrl,
      profilePicturePrompt,
    },
  };
}

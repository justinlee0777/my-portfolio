import { createImage } from '../api/openai';
import { pageConfig } from '../config/default-page.config';
import { homepageConfig } from '../homepage/default-homepage.config';
import { saveImageFromUrl } from '../utils';

export { default } from '../homepage/index';

export async function getStaticProps() {
  const profilePicturePrompt = 'A photo of Justin Lee, a web developer';

  const generatedProfilePictureUrl = await createImage({
    prompt: profilePicturePrompt,
    size: '256x256',
  });

  const savedFile = 'profile-picture.png';

  await saveImageFromUrl(generatedProfilePictureUrl, savedFile);

  return {
    props: {
      pageConfig,
      homepageConfig,
      generatedProfilePictureUrl: `/${savedFile}`,
      profilePicturePrompt,
    },
  };
}

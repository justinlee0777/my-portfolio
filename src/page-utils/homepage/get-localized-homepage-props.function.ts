import createImage from '../../api/openai/create-image.function';
import { homepageConfig } from '../../homepage/default-homepage.config';
import { getTranslationKeys } from '../../homepage/homepage.config';
import { saveImageFromUrl } from '../../utils/save-image-from-url.function';
import { translateObject } from '../../utils/translate-object.function';
import { getBasePageProps } from '../get-base-page-props.function';
import HomepagePageProps from './homepage-page-props.interface';

const profilePicturePrompt = 'A photo of Justin Lee, a web developer';
const savedFile = 'profile-picture.png';

let called = false;
async function saveProfileImage() {
  if (called) {
    return;
  }

  called = true;

  const generatedProfilePictureUrl = await createImage({
    prompt: profilePicturePrompt,
    size: '256x256',
  });

  await saveImageFromUrl(generatedProfilePictureUrl, savedFile);
}

export function getLocalizedStaticProps(
  locale: string
): () => Promise<{ props: HomepagePageProps }> {
  return async function getStaticProps(): Promise<{
    props: HomepagePageProps;
  }> {
    await saveProfileImage();

    let translatedConfig = homepageConfig;

    if (locale !== 'en') {
      translatedConfig = await translateObject(
        homepageConfig,
        getTranslationKeys(homepageConfig),
        locale
      );
    }

    const baseProps = await getBasePageProps(locale, '');

    return {
      props: {
        ...baseProps,
        homepageConfig: translatedConfig,
        generatedProfilePictureUrl: `/${savedFile}`,
        profilePicturePrompt,
      },
    };
  };
}

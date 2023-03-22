import { createImage } from '../api/openai';
import { homepageConfig } from '../homepage/default-homepage.config';
import {
  getTranslationKeys,
  HomepageConfig,
} from '../homepage/homepage.config';
import { saveImageFromUrl } from '../utils/save-image-from-url.function';
import { translateObject } from '../utils/translate-object.function';
import {
  BasePageProps,
  getBasePageProps,
} from './get-base-page-props.function';

export interface HomePageProps extends BasePageProps {
  homepageConfig: HomepageConfig;
  generatedProfilePictureUrl: string;
  profilePicturePrompt: string;
}

export function getLocalizedStaticProps(
  locale: string
): () => Promise<{ props: HomePageProps }> {
  return async function getStaticProps(): Promise<{ props: HomePageProps }> {
    const profilePicturePrompt = 'A photo of Justin Lee, a web developer';

    const generatedProfilePictureUrl = await createImage({
      prompt: profilePicturePrompt,
      size: '256x256',
    });

    const savedFile = 'profile-picture.png';

    await saveImageFromUrl(generatedProfilePictureUrl, savedFile);

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

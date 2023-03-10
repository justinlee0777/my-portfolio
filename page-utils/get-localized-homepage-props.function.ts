import { createImage } from '../api/openai';
import { pageConfig } from '../config/default-page.config';
import { PageConfig } from '../config/page.config';
import { UnitTestResults } from '../contexts/unit-test.context';
import { homepageConfig } from '../homepage/default-homepage.config';
import {
  getTranslationKeys,
  HomepageConfig,
} from '../homepage/homepage.config';
import { loadUnitTestResult } from '../utils/load-unit-test-result.function';
import { saveImageFromUrl } from '../utils/save-image-from-url.function';
import { translateObject } from '../utils/translate-object.function';

export interface HomePageProps {
  locale: string;
  pageConfig: PageConfig;
  homepageConfig: HomepageConfig;
  generatedProfilePictureUrl: string;
  profilePicturePrompt: string;
  unitTestResult: UnitTestResults;
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

    return {
      props: {
        locale,
        pageConfig,
        homepageConfig: translatedConfig,
        generatedProfilePictureUrl: `/${savedFile}`,
        profilePicturePrompt,
        unitTestResult: loadUnitTestResult(),
      },
    };
  };
}

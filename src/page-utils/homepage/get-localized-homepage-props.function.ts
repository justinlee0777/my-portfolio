import { defaultNavigationPaneConfig } from '../../config/default-open-settings.config';
import { homepageConfig } from '../../homepage/default-homepage.config';
import { getTranslationKeys } from '../../homepage/homepage.config';
import { translateObject } from '../../utils/translate-object.function';
import { getBasePageProps } from '../get-base-page-props.function';
import HomepagePageProps from './homepage-page-props.interface';

export function getLocalizedStaticProps(
  locale: string
): () => Promise<{ props: HomepagePageProps }> {
  return async function getStaticProps(): Promise<{
    props: HomepagePageProps;
  }> {
    // TODO: Call this operation only once per build.
    // await saveProfileImage();

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
        openSettingsConfig: defaultNavigationPaneConfig,
      },
    };
  };
}

import { HomepageConfig } from '../homepage.config';

export default interface HomepageProps {
  locale?: string;

  homepageConfig: HomepageConfig;

  generatedProfilePictureUrl: string;
  profilePicturePrompt: string;
}

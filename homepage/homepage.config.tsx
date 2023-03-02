import { Link } from '../config';
import { SettingsConfig } from '../config/settings.config';

export interface DeveloperDescriptionConfig {
  textContent: {
    name: string;
    prompt: string;
    tongueInCheck: string;
    profileCaption: string;
    profileDescription: string;
  };
}

export interface ResumeConfig {
  textContent: {
    lines: Array<string | Link>;
  };
}

export interface HomepageConfig {
  developerDescription: DeveloperDescriptionConfig;
  settings: SettingsConfig;
  resume: ResumeConfig;
}

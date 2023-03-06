import { Link } from '../config/link.model';
import {
  SettingsConfig,
  keysToTranslate as settingsKeysToTranslate,
} from '../config/settings.config';

export interface DeveloperDescriptionConfig {
  textContent: {
    name: string;
    prompt: string;
    tongueInCheck: string;
    profileCaption: string;
    profileDescription: string;
    profileErrorMessage: Link;
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

const developerDescriptionKeys = [
  'name',
  'prompt',
  'tongueInCheck',
  'profileCaption',
  'profileDescription',
  'profileErrorMessage.templateString',
].map((key) => `developerDescription.textContent.${key}`);

function getResumeTranslationKeys(config: HomepageConfig): Array<string> {
  return config.resume.textContent.lines.map((line, i) => {
    let key = `lines.${i}`;

    if (typeof line === 'object') {
      key = `${key}.templateString`;
    }

    return `resume.textContent.${key}`;
  });
}

const keysToTranslate = [
  ...developerDescriptionKeys,
  ...settingsKeysToTranslate.map((key) => `settings.${key}`),
];

export function getTranslationKeys(config: HomepageConfig): Array<string> {
  return [...keysToTranslate, ...getResumeTranslationKeys(config)];
}

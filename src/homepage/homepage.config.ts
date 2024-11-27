import getSettingsTranslationKeys from '../components/settings/constants/translation-keys.const';
import SettingsConfig from '../components/settings/models/settings-config.interface';
import LinkedString from '../models/linked-string.model';

export interface DeveloperDescriptionConfig {
  textContent: {
    name: string;
    prompt: string;
    tongueInCheck: string;
    profileCaption: string;
    profileDescription: string;
    profileErrorMessage: LinkedString;
  };
}

export interface ResumeConfig {
  textContent: {
    lines: Array<string | LinkedString>;
  };
}

export interface ProjectConfig {
  thumbnail: string;
  description: string;
  header: string;
  url: string;
}

export interface ProjectsConfig {
  header: string;
  description: Array<string>;
  entries: Array<ProjectConfig>;
}

export interface HomepageConfig {
  seo: {
    title: string;
    description: string;
  };
  developerDescription: DeveloperDescriptionConfig;
  settings: SettingsConfig;
  resume: ResumeConfig;
  projects: ProjectsConfig;
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
  'seo.title',
  'seo.description',
  ...developerDescriptionKeys,
  ...getSettingsTranslationKeys().map((key) => `settings.${key}`),
];

export function getTranslationKeys(config: HomepageConfig): Array<string> {
  return [...keysToTranslate, ...getResumeTranslationKeys(config)];
}

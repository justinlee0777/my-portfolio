import { Link } from './link.model';

export interface SettingsConfig {
  textContent: {
    header: string;
    subheader: string;
    prompt: string;
    explanation: {
      marquee: Link;
      tiltPrism: Link;
      eater: Link;
      developerMode: string;
    };
  };
}

const explanationKeys = [
  'marquee.templateString',
  'tiltPrism.templateString',
  'eater.templateString',
  'developerMode',
].map((key) => `explanation.${key}`);

export const keysToTranslate = [
  'header',
  'subheader',
  'prompt',
  ...explanationKeys,
].map((key) => `textContent.${key}`);

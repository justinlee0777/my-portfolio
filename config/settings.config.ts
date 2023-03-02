import { Link } from './link.model';

export interface SettingsConfig {
  textContent: {
    header: string;
    subheader: string;
    prompt: string;
    marqueeExplanation: Link;
  };
}

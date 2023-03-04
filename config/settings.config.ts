import { Link } from './link.model';

export interface SettingsConfig {
  textContent: {
    header: string;
    subheader: string;
    prompt: string;
    explanation: {
      marquee: Link;
      tiltPrism: Link;
      developerMode: string;
    };
  };
}

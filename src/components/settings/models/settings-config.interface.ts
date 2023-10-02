import { Link } from '../../../config/link.model';

export default interface SettingsConfig {
  textContent: {
    header: string;
    subheader: string;
    prompt: string;
    explanation: {
      translation: Link;
      marquee: Link;
      tiltPrism: Link;
      eater: Link;
      developerMode: string;
    };
  };
}

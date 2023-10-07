import LinkedString from '../../../models/linked-string.model';

export default interface SettingsConfig {
  textContent: {
    header: string;
    subheader: string;
    prompt: string;
    explanation: {
      translation: LinkedString;
      marquee: LinkedString;
      tiltPrism: LinkedString;
      eater: LinkedString;
      developerMode: string;
    };
  };
}

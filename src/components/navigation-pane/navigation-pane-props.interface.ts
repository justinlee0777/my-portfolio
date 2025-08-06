import OpenSettingsConfig from './models/open-settings-config.interface';

export default interface OpenSettingsProps {
  config: OpenSettingsConfig;

  className?: string;
  route?: string;
}

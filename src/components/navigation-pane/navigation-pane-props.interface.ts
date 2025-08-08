import OpenSettingsConfig from './models/navigation-pane-config.interface';

export default interface OpenSettingsProps {
  config: OpenSettingsConfig;

  className?: string;
  route?: string;
}

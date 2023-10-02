import SettingsConfig from '../../settings/models/settings-config.interface';

export default interface OpenSettingsConfig {
  settings: SettingsConfig;
  aria: {
    expandLabel: string;
    collapseLabel: string;
  };
}

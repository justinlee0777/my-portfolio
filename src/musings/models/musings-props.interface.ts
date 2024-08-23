import { MusingConfig } from '../components/musing/musing.config';
import { MusingsPageConfig } from '../musings-page.config';

export default interface MusingsProps {
  config: MusingsPageConfig;

  musings: Array<MusingConfig>;
}

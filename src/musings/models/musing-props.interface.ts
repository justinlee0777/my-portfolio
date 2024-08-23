import Font from '../../models/font.enum';
import { MusingConfig } from '../components/musing/musing.config';

export default interface MusingProps {
  config: MusingConfig;
  font: Font;

  showAIForm?: boolean;
}

import { Modal } from '../../services/modal';
import RandomOfTheDayConfig from './random-of-the-day-config.interface';

export default interface RandomOfTheDayProps {
  modal: Modal;

  randomOfTheDayConfig: RandomOfTheDayConfig;
  apiUrl: string;
}

import RandomOfTheDayProps from '../../random-of-the-day/models/random-of-the-day-props.interface';
import { BasePageProps } from '../get-base-page-props.function';

type RandomOfTheDayPageProps = BasePageProps &
  Omit<RandomOfTheDayProps, 'modal' | 'apiUrl'>;

export default RandomOfTheDayPageProps;

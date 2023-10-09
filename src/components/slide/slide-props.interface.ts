import { RefObject } from 'react';

export default interface SlideProps {
  children: JSX.Element;
  className?: string;
  animated?: 'activated' | 'unactivated';
  id?: string;
  slideRef?: RefObject<HTMLElement>;
}

import { type JSX } from 'react';

export default interface OrderableListProps {
  id?: string;
  className?: string;
  animated?: 'activated' | 'unactivated';

  listElements: Array<{
    value: string | number;
    element: JSX.Element;
  }>;
  onReorder: (items: Array<string | number>) => void;
}

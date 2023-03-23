import styles from './orderable-list.module.scss';

import classNames from 'classnames';

export interface OrderableListProps {
  className?: string;
  listElements: Array<{
    value: string | number;
    element: JSX.Element;
  }>;
  onReorder: (items: Array<string | number>) => void;
}

export default function OrderableList({
  className,
  listElements,
  onReorder,
}: OrderableListProps): JSX.Element {
  const orderableListClassName = classNames(styles.orderableList, className);
  const upArrowClassName = classNames(styles.arrowUp, styles.arrow);

  const lastIndex = listElements.length - 1;

  return (
    <ol className={orderableListClassName}>
      {listElements.map((listElement, i) => {
        return (
          <li className={styles.listItem} key={listElement.value}>
            {listElement.element}
            {i !== 0 && (
              <button className={upArrowClassName} onClick={swapFn(i, i - 1)}>
                {String.fromCharCode(8593)}
              </button>
            )}
            {i !== lastIndex && (
              <button className={styles.arrow} onClick={swapFn(i, i + 1)}>
                {String.fromCharCode(8595)}
              </button>
            )}
          </li>
        );
      })}
    </ol>
  );

  function swapFn(currentIndex: number, newIndex: number): () => void {
    return () => {
      const newList = listElements.map((listItem) => listItem.value);

      const currentValue = newList[currentIndex];
      newList[currentIndex] = newList[newIndex];
      newList[newIndex] = currentValue;

      onReorder(newList);
    };
  }
}

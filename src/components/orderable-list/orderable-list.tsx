import styles from './orderable-list.module.scss';

import classNames from 'classnames';
import { type JSX } from 'react';

import UnitTestCheck from '../unit-test-check/unit-test-check';
import OrderableListProps from './orderable-list-props.interface';

export default function OrderableList({
  id,
  className,
  animated,
  listElements,
  onReorder,
}: OrderableListProps): JSX.Element {
  const orderableListClassName = classNames(styles.orderableList, className);

  const lastIndex = listElements.length - 1;

  let content: JSX.Element = <></>;

  if (listElements.length > 1) {
    content = (
      <>
        {listElements.map((listElement, i) => {
          return (
            <li className={styles.listItem} key={listElement.value}>
              {listElement.element}
              <button
                className={classNames(styles.arrow, {
                  [styles.arrowHidden]: i === 0,
                })}
                aria-label={`Move "${listElement.value}" section up`}
                onClick={swapFn(i, i - 1)}
              >
                {String.fromCharCode(8593)}
              </button>
              <button
                className={classNames(styles.arrow, {
                  [styles.arrowHidden]: i === lastIndex,
                })}
                aria-label={`Move "${listElement.value}" section down`}
                onClick={swapFn(i, i + 1)}
              >
                {String.fromCharCode(8595)}
              </button>
            </li>
          );
        })}
      </>
    );
  }

  return (
    <ol id={id} className={orderableListClassName} data-animatable={animated}>
      <UnitTestCheck componentName="OrderableList" />
      {content}
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

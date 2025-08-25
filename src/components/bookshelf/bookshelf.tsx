import clsx from 'clsx';
import styles from './bookshelf.module.scss';

import { JSX, useCallback } from 'react';
import { type ProsperoLibraryTitle } from '../../models/prospero-library-title.model';
interface Props {
  books: Array<ProsperoLibraryTitle>;

  className?: string;
}

/**
 * Inspiration from https://codepen.io/OzCodes/pen/ZERyQjX .
 *
 * TODO: Need sorting.
 */
export function Bookshelf({ className, books }: Props): JSX.Element {
  const bookSort = useCallback(
    (a: ProsperoLibraryTitle, b: ProsperoLibraryTitle) => {
      return (
        a.authorLastName.localeCompare(b.authorLastName) ||
        a.authorFirstName.localeCompare(b.authorFirstName) ||
        a.name.localeCompare(b.name)
      );
    },
    []
  );

  return (
    <div className={clsx(styles.bookshelf, className)}>
      <div className={clsx(styles.bookshelfEdge, styles.bookshelfBack)}>
        {books.sort(bookSort).map((book) => {
          return (
            <a key={book.urlSlug} className={styles.book} href={book.urlSlug}>
              <h4 className={styles.bookTitle}>{book.name}</h4>
              <p className={styles.bookAuthor}>
                {book.authorLastName}, {book.authorFirstName}
              </p>
            </a>
          );
        })}
      </div>
      <div className={clsx(styles.bookshelfEdge, styles.bookshelfBottom)}></div>
      <div className={styles.bookshelfFloor}></div>
      <div className={styles.bookshelfShadow}></div>
    </div>
  );
}

import clsx from 'clsx';
import styles from './bookshelf.module.scss';

import { JSX, useCallback } from 'react';

interface Book {
  author: {
    firstName: string;
    lastName: string;
  };
  url: string;
  title: string;
}

interface Props {
  books: Array<Book>;

  className?: string;
}

/**
 * Inspiration from https://codepen.io/OzCodes/pen/ZERyQjX .
 */
export function Bookshelf({ className, books }: Props): JSX.Element {
  const bookSort = useCallback((a: Book, b: Book) => {
    return (
      a.author.lastName.localeCompare(b.author.lastName) ||
      a.author.firstName.localeCompare(b.author.firstName) ||
      a.title.localeCompare(b.title)
    );
  }, []);

  return (
    <div className={clsx(styles.bookshelf, className)}>
      <div className={clsx(styles.bookshelfEdge, styles.bookshelfBack)}>
        {books.sort(bookSort).map((book) => {
          return (
            <a className={styles.book} href={book.url}>
              <h4 className={styles.bookTitle}>{book.title}</h4>
              <p className={styles.bookAuthor}>
                {book.author.lastName}, {book.author.firstName}
              </p>
            </a>
          );
        })}
      </div>
      <div className={clsx(styles.bookshelfEdge, styles.bookshelfBottom)}></div>
      <div className={styles.bookshelfShadow}></div>
    </div>
  );
}

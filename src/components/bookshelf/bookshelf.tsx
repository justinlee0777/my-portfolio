import clsx from 'clsx';
import styles from './bookshelf.module.scss';

import { JSX, useCallback, useEffect, useRef, useState } from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { ProsperoLibraryTitle } from '../../models/prospero-library-title-models';

interface Props {
  books: Array<ProsperoLibraryTitle>;

  className?: string;
}

/**
 * Inspiration from https://codepen.io/OzCodes/pen/ZERyQjX .
 */
export function Bookshelf({ className, books }: Props): JSX.Element {
  const bookListRef = useRef<HTMLDivElement | null>(null);

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

  const [leftScrollHidden, setLeftScrollHidden] = useState(false);

  const [rightScrollHidden, setRightScrollHidden] = useState(false);

  const updateScrollButtons = useCallback(() => {
    const bookListElement = bookListRef.current;
    if (bookListElement) {
      setLeftScrollHidden(bookListElement!.scrollLeft === 0);
      setRightScrollHidden(
        bookListElement!.scrollLeft + bookListElement!.clientWidth >=
          bookListElement!.scrollWidth
      );
    }
  }, [bookListRef.current, setLeftScrollHidden, setRightScrollHidden]);

  useEffect(() => {
    const bookListElement = bookListRef.current;
    if (bookListElement) {
      bookListElement.addEventListener('scroll', updateScrollButtons);
      const resizeObserver = new ResizeObserver(updateScrollButtons);

      resizeObserver.observe(bookListElement);

      return () => {
        bookListElement.removeEventListener('scroll', updateScrollButtons);
        resizeObserver.unobserve(bookListElement);
        resizeObserver.disconnect();
      };
    }
  }, [bookListRef.current, updateScrollButtons]);

  const MdArrowBackIcon = MdArrowBack as () => JSX.Element,
    MdArrowForwardIcon = MdArrowForward as () => JSX.Element;

  return (
    <div className={clsx(styles.bookshelf, className)}>
      <div className={clsx(styles.bookshelfEdge, styles.bookshelfBack)}></div>
      <div className={styles.books}>
        <button
          className={clsx({
            [styles.hideScrollButton]: leftScrollHidden,
          })}
          onClick={() => {
            const bookListElement = bookListRef.current;
            if (bookListElement) {
              bookListElement.scrollBy({
                left: -bookListElement.clientWidth,
                behavior: 'smooth',
              });
            }
          }}
        >
          <MdArrowBackIcon />
        </button>
        <div
          className={styles.bookList}
          ref={(ref) => {
            updateScrollButtons();
            bookListRef.current = ref;
          }}
        >
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
        <button
          className={clsx({
            [styles.hideScrollButton]: rightScrollHidden,
          })}
          onClick={() => {
            const bookListElement = bookListRef.current;
            if (bookListElement) {
              bookListElement.scrollBy({
                left: bookListElement.clientWidth,
                behavior: 'smooth',
              });
            }
          }}
        >
          <MdArrowForwardIcon />
        </button>
      </div>
      <div className={clsx(styles.bookshelfEdge, styles.bookshelfBottom)}></div>
      <div className={styles.bookshelfFloor}></div>
      <div className={styles.bookshelfShadow}></div>
    </div>
  );
}

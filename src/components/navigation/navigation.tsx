import styles from './navigation.module.scss';

import Link from 'next/link';
import classNames from 'classnames';
import { useState } from 'react';

export interface NavigationProps {
  locale: string;
  links: Array<{
    displayName: string;
    url: string;
  }>;
  className?: string;
}

export function Navigation({
  locale,
  links,
  className,
}: NavigationProps): JSX.Element {
  const [leftArrowHintShown, setLeftArrowHintShown] = useState(false);
  const [rightArrowHintShown, setRightArrowHintShown] = useState(false);

  const navigationClassName = classNames(styles.navigation, className);

  return (
    <nav className={navigationClassName}>
      <a className={styles.skipLink} href="#maincontent">
        Skip to main content
      </a>
      <Link
        className={classNames(styles.navigationLink, styles.homeLink)}
        href={`/${locale}/`}
      >
        Justin Lee
      </Link>
      <div className={styles.navigationLinksContainer}>
        {leftArrowHintShown && (
          <div className={classNames(styles.arrowHint, styles.arrowHintLeft)}>
            {String.fromCharCode(8656)}
          </div>
        )}
        <ul
          className={styles.navigationLinks}
          onScroll={(event) => showArrowHints(event.target as HTMLElement)}
          ref={(element) => element && showArrowHints(element)}
        >
          {links.map((link) => (
            <Link
              className={classNames(styles.navigationLink)}
              href={link.url}
              key={link.displayName}
            >
              {link.displayName}
            </Link>
          ))}
          {rightArrowHintShown && (
            <div
              className={classNames(styles.arrowHint, styles.arrowHintRight)}
            >
              {String.fromCharCode(8658)}
            </div>
          )}
        </ul>
      </div>
    </nav>
  );

  function showArrowHints(listElement: HTMLElement): void {
    const { scrollLeft, clientWidth, scrollWidth } = listElement;

    setLeftArrowHintShown(scrollLeft !== 0);
    setRightArrowHintShown(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
  }
}

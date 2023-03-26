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
        <ul className={styles.navigationLinks}>
          {links.map((link) => (
            <li
              className={classNames(styles.navigationLink)}
              key={link.displayName}
            >
              <Link href={link.url}>{link.displayName}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

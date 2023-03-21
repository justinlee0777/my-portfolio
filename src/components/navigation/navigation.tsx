import styles from './navigation.module.scss';

import Link from 'next/link';
import classNames from 'classnames';

export interface NavigationProps {
  links: Array<{
    displayName: string;
    url: string;
    isHome?: boolean;
  }>;
  className?: string;
}

export function Navigation({ links, className }: NavigationProps): JSX.Element {
  const navigationClassName = classNames(styles.navigation, className);

  return (
    <nav className={navigationClassName}>
      <a className={styles.skipLink} href="#maincontent">
        Skip to main content
      </a>
      {links.map((link) => (
        <Link
          className={classNames(styles.navigationLink, {
            [styles.homeLink]: link.isHome,
          })}
          href={link.url}
          key={link.displayName}
        >
          {link.displayName}
        </Link>
      ))}
    </nav>
  );
}

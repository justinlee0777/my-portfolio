import styles from './navigation-pane.module.scss';

import classNames from 'classnames';
import { useMemo, useRef, useState, type JSX } from 'react';

import { defaultProjectsConfig } from '../../config/default-projects.config';
import Settings from '../settings/settings';
import UnitTestCheck from '../unit-test-check/unit-test-check';
import NavigationPaneProps from './navigation-pane-props.interface';

interface NavigationPaneSection {
  displayName: string;
  content: JSX.Element;
  ariaLabel: string;
}

export default function NavigationPane({
  className,
  route,
  config,
}: NavigationPaneProps): JSX.Element {
  const [opened, setOpened] = useState(false);
  const [openedSection, setOpenedSection] = useState<
    NavigationPaneSection | undefined
  >();

  const navigationPaneRef = useRef<HTMLDivElement | null>(null);

  const sections: Array<NavigationPaneSection> = useMemo(
    () => [
      {
        displayName: 'Projects',
        content: (
          <>
            {defaultProjectsConfig.map(({ header, url }) => {
              return (
                <a key={url} href={url}>
                  <button>{header}</button>
                </a>
              );
            })}
          </>
        ),
        ariaLabel: `Open up the options to see the site's Projects.`,
      },
      {
        displayName: 'Settings',
        content: <Settings route={route} config={config.settings} />,
        ariaLabel: `Open up the Settings to configure the website's appearance.`,
      },
    ],
    [config.settings, route]
  );

  const menuClassName = classNames(styles.menu, className, {
    [styles.menuOpened]: opened,
  });

  let navigationPaneContent: JSX.Element = <></>;

  if (openedSection) {
    navigationPaneContent = (
      <>
        <button
          onClick={() => {
            setOpenedSection(undefined);

            const navigationPaneElement = navigationPaneRef.current!;
            navigationPaneElement.scrollTo({ left: 0, behavior: 'smooth' });
          }}
        >
          Back
        </button>
        {openedSection.content}
      </>
    );
  }

  return (
    <div className={menuClassName}>
      <UnitTestCheck componentName="OpenSettings" />
      <button
        className={styles.menuIcon}
        aria-label={
          opened ? config.aria.collapseLabel : config.aria.expandLabel
        }
        aria-pressed={opened}
        aria-expanded={opened}
        onClick={() => {
          setOpened(!opened);
        }}
      >
        <div className={styles.menuTriangle}></div>
        <div className={styles.menuLine}></div>
      </button>
      <div
        className={styles.navigationPane}
        tabIndex={Number(opened) - 1}
        ref={navigationPaneRef}
      >
        <div className={styles.navigationList}>
          {sections.map((section) => {
            const { displayName, ariaLabel } = section;

            return (
              <button
                key={section.displayName}
                aria-label={ariaLabel}
                onClick={() => {
                  setOpenedSection(section);

                  const navigationPaneElement = navigationPaneRef.current!;
                  navigationPaneElement.scrollTo({
                    left: navigationPaneElement.clientWidth,
                    behavior: 'smooth',
                  });
                }}
              >
                {displayName}
              </button>
            );
          })}
        </div>
        <div className={styles.navigationList}>{navigationPaneContent}</div>
      </div>
    </div>
  );
}

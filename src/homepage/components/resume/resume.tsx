import { type JSX } from 'react';

import UnitTestCheck from '../../../components/unit-test-check/unit-test-check';
import createLinkElement from '../../../config/create-link-element.function';
import { ResumeConfig } from '../../homepage.config';
import styles from './resume.module.scss';

export default function Resume({
  config,
}: {
  config: ResumeConfig;
}): JSX.Element {
  const lines = config.textContent.lines.map((line, i) => {
    if (typeof line === 'object') {
      return (
        <p
          className={styles.line}
          dangerouslySetInnerHTML={{ __html: createLinkElement(line) }}
          key={i}
        ></p>
      );
    } else {
      return (
        <p className={styles.line} key={i}>
          {line}
        </p>
      );
    }
  });

  return (
    <>
      <UnitTestCheck
        componentName="Resume"
        style={{ transform: 'translateX(25vw)' }}
      />
      <main className={styles.resumeContent}>{lines}</main>
    </>
  );
}

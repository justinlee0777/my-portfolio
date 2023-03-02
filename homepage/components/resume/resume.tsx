import { createLinkElement } from '../../../config';
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

  return <>{lines}</>;
}

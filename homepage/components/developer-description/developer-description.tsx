import { DeveloperDescriptionConfig } from '../../homepage.config';
import styles from './developer-description.module.scss';

export default function DeveloperDescription({
  config,
}: {
  config: DeveloperDescriptionConfig;
}): JSX.Element {
  return (
    <>
      <h1 className={styles.developerName}>{config.textContent.name}</h1>
      <h2 className={styles.developerPrompt}>{config.textContent.prompt}</h2>
      <p className={styles.developerTongueInCheck}>
        {config.textContent.tongueInCheck}
      </p>
    </>
  );
}

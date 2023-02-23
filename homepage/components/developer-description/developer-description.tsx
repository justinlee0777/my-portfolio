import styles from './developer-description.module.scss';

export default function DeveloperDescription(): JSX.Element {
  return (
    <>
      <h1 className={styles.developerName}>Justin Lee</h1>
      <h2 className={styles.developerPrompt}>Who am I?</h2>
      <p className={styles.developerTongueInCheck}>
        Good question. I also am looking for that answer.
      </p>
    </>
  );
}

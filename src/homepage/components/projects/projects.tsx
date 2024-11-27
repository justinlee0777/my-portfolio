import styles from './projects.module.scss';

import { ProjectsConfig } from '../../homepage.config';

interface Props extends ProjectsConfig {}

export default function Projects({
  entries,
  header,
  description,
}: Props): JSX.Element {
  return (
    <div className={styles.projectsContainer}>
      <h2 className={styles.projectsHeader}>{header}</h2>
      {description.map((partial, i) => (
        <p key={i}>{partial}</p>
      ))}
      <div className={styles.projects}>
        {entries.map((entry) => {
          return (
            <a key={entry.header} href={entry.url} className={styles.project}>
              <img
                className={styles.projectThumbnail}
                src={entry.thumbnail}
              ></img>
              <h4 className={styles.projectHeader}>{entry.header}</h4>
              <p>{entry.description}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
}

import styles from './developer-description.module.scss';

import { useEffect, useState } from 'react';

import { DeveloperDescriptionConfig } from '../../homepage.config';

export default function DeveloperDescription({
  config,
  generatedProfilePictureUrl,
}: {
  config: DeveloperDescriptionConfig;
  generatedProfilePictureUrl: string;
}): JSX.Element {
  const [captionShown, setCaptionShown] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCaptionShown(true);
    }, 1000);
  }, []);

  const captionClassName =
    styles.profileCaption +
    (captionShown ? ` ${styles.profileCaptionShown}` : '');

  return (
    <>
      <h1 className={styles.developerName}>{config.textContent.name}</h1>
      <h2 className={styles.developerPrompt}>{config.textContent.prompt}</h2>
      <p className={styles.developerTongueInCheck}>
        {config.textContent.tongueInCheck}
      </p>
      <img
        className={styles.generatedProfilePicture}
        src={generatedProfilePictureUrl}
        width={256}
        height={256}
      />
      <figcaption className={captionClassName}>
        {config.textContent.profileCaption}
      </figcaption>
    </>
  );
}

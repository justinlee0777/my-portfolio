import styles from './developer-description.module.scss';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import { DeveloperDescriptionConfig } from '../../homepage.config';
import { createLinkElement } from '../../../config/link.model';
import UnitTestCheck from '../../../components/unit-test-check/unit-test-check';

export default function DeveloperDescription({
  config,
  generatedProfilePictureUrl,
  profilePicturePrompt,
}: {
  config: DeveloperDescriptionConfig;
  generatedProfilePictureUrl: string;
  profilePicturePrompt: string;
}): JSX.Element {
  const [captionShown, setCaptionShown] = useState(false);
  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCaptionShown(true);
    }, 1000);
  }, []);

  const captionClassName = classNames(styles.profileCaption, {
    [styles.profileCaptionShown]: captionShown,
  });

  let profileImage: JSX.Element;

  if (!imageLoadFailed) {
    profileImage = (
      <Image
        className={styles.generatedProfilePicture}
        src={generatedProfilePictureUrl}
        alt={config.textContent.profileDescription}
        width={256}
        height={256}
        onError={() => setImageLoadFailed(true)}
      />
    );
  } else {
    profileImage = (
      <p
        className={styles.profileErrorMessage}
        dangerouslySetInnerHTML={{
          __html: createLinkElement(config.textContent.profileErrorMessage),
        }}
      ></p>
    );
  }

  return (
    <>
      <UnitTestCheck componentName={DeveloperDescription.name} />
      <h1 className={styles.developerName}>{config.textContent.name}</h1>
      <h2 className={styles.developerPrompt}>{config.textContent.prompt}</h2>
      <p className={styles.developerTongueInCheck}>
        {config.textContent.tongueInCheck}
      </p>
      {profileImage}
      <figcaption className={captionClassName}>
        {config.textContent.profileCaption}: "{profilePicturePrompt}"
      </figcaption>
    </>
  );
}

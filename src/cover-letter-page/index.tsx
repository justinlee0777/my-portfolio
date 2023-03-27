import styles from './index.module.scss';

import { useEffect } from 'react';

import { CoverLetterPageProps } from '../page-utils/get-cover-letter-props.function';
import Slide from '../components/slide/slide';
import { createLinkElement } from '../config/link.model';

export default function CoverLetterPage({
  config,
  opening,
}: CoverLetterPageProps): JSX.Element {
  const endings = config.textContent.ending.map((line, i) => {
    if (typeof line === 'object') {
      return (
        <p
          dangerouslySetInnerHTML={{ __html: createLinkElement(line) }}
          key={i}
        ></p>
      );
    } else {
      return <p key={i}>{line}</p>;
    }
  });

  return (
    <Slide className={styles.coverLetter}>
      <>
        <div dangerouslySetInnerHTML={{ __html: opening }} />
        <video
          className={styles.upscaleWalkthrough}
          src="https://53-state-street.s3.amazonaws.com/SAP+Upscale+Commerce.mp4"
          controls
          playsInline
        ></video>
        <p>{config.textContent.secondSectionOpening}</p>
        {endings}
      </>
    </Slide>
  );
}

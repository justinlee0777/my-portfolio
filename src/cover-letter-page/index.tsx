import styles from './index.module.scss';

import { useEffect, useRef } from 'react';

import { CoverLetterPageProps } from '../page-utils/get-cover-letter-props.function';
import Slide from '../components/slide/slide';
import { animateCoverLetter } from './animate-cover-letter.function';

export default function CoverLetterPage({
  config,
  opening,
}: CoverLetterPageProps): JSX.Element {
  const slideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const [, ...nonIntroParagraphs] = slideRef.current.querySelectorAll('p');

    animateCoverLetter(nonIntroParagraphs);
  }, []);

  return (
    <Slide className={styles.coverLetter} slideRef={slideRef}>
      <>
        <div dangerouslySetInnerHTML={{ __html: opening }} />
        <video
          className={styles.upscaleWalkthrough}
          src="https://53-state-street.s3.amazonaws.com/SAP+Upscale+Commerce.mp4"
          controls
          playsInline
        ></video>
        <p>{config.textContent.secondSectionOpening}</p>
        {config.textContent.ending.map((content, i) => (
          <p key={i}>{content}</p>
        ))}
      </>
    </Slide>
  );
}

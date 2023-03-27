import styles from './index.module.scss';

import { useEffect, useRef, useState } from 'react';

import { CoverLetterPageProps } from '../page-utils/get-cover-letter-props.function';
import Slide from '../components/slide/slide';
import { animateCoverLetter } from './animate-cover-letter.function';
import { getCompanySpecificCoverLetter } from './cover-letter.api';

export default function CoverLetterPage({
  apiUrl,
  config,
  opening,
}: CoverLetterPageProps): JSX.Element {
  const slideRef = useRef<HTMLElement>(null);

  const [companySpecificCover, setCompanySpecificCover] = useState<
    string | null
  >(null);

  useEffect(() => {
    const [, ...nonIntroParagraphs] = slideRef.current.querySelectorAll('p');

    animateCoverLetter(nonIntroParagraphs);
  }, []);

  useEffect(() => {
    getCompanySpecificCoverLetter(apiUrl).then((htmlString) =>
      setCompanySpecificCover(htmlString)
    );
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
        <div dangerouslySetInnerHTML={{ __html: companySpecificCover }} />
        {config.textContent.ending.map((content, i) => (
          <p key={i}>{content}</p>
        ))}
      </>
    </Slide>
  );
}

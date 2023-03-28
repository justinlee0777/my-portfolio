import styles from './index.module.scss';

import { useEffect, useRef } from 'react';

import { CoverLetterPageProps } from '../page-utils/get-cover-letter-props.function';
import Slide from '../components/slide/slide';
import { animateCoverLetter } from './animate-cover-letter.function';
import { getCompanySpecificCoverLetter } from './cover-letter.api';
import { useApi } from '../utils/hooks/use-api.hook';
import LoadingScreen from '../components/loading-screen/loading-screen';

export default function CoverLetterPage({
  apiUrl,
  config,
  opening,
}: CoverLetterPageProps): JSX.Element {
  const slideRef = useRef<HTMLElement>(null);

  const [companySpecificCover, error] = useApi(() =>
    getCompanySpecificCoverLetter(apiUrl)
  );

  useEffect(() => {
    const [, ...nonIntroParagraphs] = slideRef.current.querySelectorAll('p');

    animateCoverLetter(nonIntroParagraphs);
  }, []);

  let companySpecificContent: JSX.Element;

  if (error) {
    companySpecificContent = (
      <p className={styles.errorMessage}>
        {config.textContent.companySpecificCoverErrorMessage}
      </p>
    );
  } else if (!companySpecificCover) {
    companySpecificContent = <LoadingScreen />;
  } else {
    companySpecificContent = (
      <div dangerouslySetInnerHTML={{ __html: companySpecificCover }} />
    );
  }

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
        {companySpecificContent}
        {config.textContent.ending.map((content, i) => (
          <p key={i}>{content}</p>
        ))}
      </>
    </Slide>
  );
}

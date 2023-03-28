import styles from './index.module.scss';

import { useRef } from 'react';

import { CoverLetterPageProps } from '../page-utils/get-cover-letter-props.function';
import Slide from '../components/slide/slide';
import LoadingScreen from '../components/loading-screen/loading-screen';
import { useCompanySpecificResponse } from './use-company-specific-response.hook';
import { useCoverLetterAnimation } from './use-cover-letter-animation.hook';

export default function CoverLetterPage({
  apiUrl,
  config,
  opening,
}: CoverLetterPageProps): JSX.Element {
  const slideRef = useRef<HTMLElement>(null);

  const [companySpecificCover, error, waitForCompanySpecificResponse] =
    useCompanySpecificResponse(apiUrl);

  const genericOpeningId = 'generic-opening';
  const upscaleWalkthroughId = 'upscale-walkthrough';
  const secondSectionOpeningId = 'second-section-opening';
  const companySpecificId = 'company-specific';
  const endingId = 'ending';

  useCoverLetterAnimation(slideRef.current, [
    () => [...document.getElementById(genericOpeningId).querySelectorAll('p')],
    () => [document.getElementById(upscaleWalkthroughId)],
    () => [document.getElementById(secondSectionOpeningId)],
    waitForCompanySpecificResponse.then(([success]) => {
      if (success) {
        return () => [
          ...document.getElementById(companySpecificId).querySelectorAll('p'),
        ];
      } else {
        return () => [];
      }
    }),
    () => [...document.getElementById(endingId).querySelectorAll('p')],
  ]);

  let companySpecificContent: JSX.Element;

  if (error) {
    companySpecificContent = (
      <p className={styles.errorMessage}>
        {config.textContent.companySpecificCoverErrorMessage}
      </p>
    );
  } else if (!companySpecificCover) {
    companySpecificContent = <LoadingScreen className={styles.loadingScreen} />;
  } else {
    companySpecificContent = (
      <div
        id={companySpecificId}
        className={styles.companySpecificSection}
        dangerouslySetInnerHTML={{ __html: companySpecificCover }}
      />
    );
  }

  return (
    <Slide className={styles.coverLetter} slideRef={slideRef}>
      <>
        <div
          id={genericOpeningId}
          dangerouslySetInnerHTML={{ __html: opening }}
        />
        <div className={styles.videoContainer} id={upscaleWalkthroughId}>
          <video
            className={styles.upscaleWalkthrough}
            src="https://53-state-street.s3.amazonaws.com/SAP+Upscale+Commerce.mp4"
            controls
            playsInline
          ></video>
        </div>
        <p id={secondSectionOpeningId}>
          {config.textContent.secondSectionOpening}
        </p>
        {companySpecificContent}
        <div id={endingId}>
          {config.textContent.ending.map((content, i) => (
            <p key={i}>{content}</p>
          ))}
        </div>
      </>
    </Slide>
  );
}

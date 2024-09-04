import styles from './index.module.scss';

import { useRef } from 'react';

import classNames from 'classnames';
import LoadingScreen from '../components/loading-screen/loading-screen';
import Slide from '../components/slide/slide';
import { CoverLetterPageProps } from '../page-utils/get-cover-letter-props.function';
import { useApi } from '../utils/hooks/use-api.hook';
import secondsToTimestamp from '../utils/seconds-to-timestamp.function';
import { getCompanySpecificCoverLetter } from './cover-letter.api';
import { useHeaderAnimation } from './use-header-animation.hook';

export default function CoverLetterPage({
  apiUrl,
  config,
}: CoverLetterPageProps): JSX.Element {
  const [coverLetter, error] = useApi(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const companyId = urlParams.get('company') ?? undefined;
    return getCompanySpecificCoverLetter(apiUrl, companyId);
  });

  const headerRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [startAnimation, contentAnimationBegun, headerAnimatonDone] =
    useHeaderAnimation(
      headerRef.current?.querySelector('span')!,
      config.textContent.header
    );

  let content: JSX.Element;

  if (error) {
    content = (
      <p className={styles.errorMessage}>
        {config.textContent.companySpecificCoverErrorMessage}
      </p>
    );
  } else if (!coverLetter) {
    content = (
      <LoadingScreen
        className={styles.loadingScreen}
        message="Fetching the cover letter from a server..."
      />
    );
  } else {
    const coverLetterContentClassname = classNames(styles.coverLetterContent, {
      [styles.coverLetterContentActivated]: contentAnimationBegun,
    });

    const reelLength = videoRef.current
      ? secondsToTimestamp(videoRef.current.duration)
      : '';

    content = (
      <>
        <h1
          ref={(ref) => {
            (headerRef as any).current = ref;
            startAnimation();
          }}
        >
          <span></span>
          <span className={styles.marker}> </span>
        </h1>
        <div className={coverLetterContentClassname}>
          <div dangerouslySetInnerHTML={{ __html: coverLetter }} />
          <h2 className={styles.videoHeader}>Upscale reel ({reelLength})</h2>
          <video
            className={styles.upscaleWalkthrough}
            src="https://53-state-street.s3.amazonaws.com/Upscale+reel.mp4#t=0.001"
            controls
            playsInline
            ref={videoRef}
          />
        </div>
      </>
    );
  }

  const slideClassnames = classNames(styles.coverLetter, {
    [styles.animated]: headerAnimatonDone,
  });

  return (
    <Slide className={slideClassnames}>
      <>{content}</>
    </Slide>
  );
}

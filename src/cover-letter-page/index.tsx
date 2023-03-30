import styles from './index.module.scss';

import { useMemo, useRef } from 'react';

import { CoverLetterPageProps } from '../page-utils/get-cover-letter-props.function';
import Slide from '../components/slide/slide';
import LoadingScreen from '../components/loading-screen/loading-screen';
import { useApi } from '../utils/hooks/use-api.hook';
import { getCompanySpecificCoverLetter } from './cover-letter.api';

export default function CoverLetterPage({
  apiUrl,
  config,
}: CoverLetterPageProps): JSX.Element {
  const companyId = useMemo(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('company') ?? undefined;
  }, []);

  const slideRef = useRef<HTMLElement>(null);

  const [coverLetter, error] = useApi(() =>
    getCompanySpecificCoverLetter(apiUrl, companyId)
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
    content = (
      <div
        className={styles.companySpecificSection}
        dangerouslySetInnerHTML={{ __html: coverLetter }}
      />
    );
  }

  return (
    <Slide className={styles.coverLetter} slideRef={slideRef}>
      <>{content}</>
    </Slide>
  );
}

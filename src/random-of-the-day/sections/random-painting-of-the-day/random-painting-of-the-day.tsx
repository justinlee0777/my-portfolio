import slideStyles from '../slide.module.scss';
import styles from './random-painting-of-the-day.module.scss';

import { useEffect, useState } from 'react';

import Slide from '../../../components/slide/slide';
import { createLinkElement, Link } from '../../../config/link.model';
import { Painting } from '../../painting.interface';
import { getPainting } from '../../random-of-the-day.api';
import LoadingScreen from '../../../components/loading-screen/loading-screen';
import ErrorScreen from '../../../components/error-screen/error-screen';
import { loadImage } from '../../../utils/load-image.function';
import HighResImageDialog from './high-res-image-dialog/high-res-image-dialog';
import UnitTestCheck from '../../../components/unit-test-check/unit-test-check';

interface RandomPaintingOfTheDayProps {
  id?: string;
  animated?: 'activated' | 'unactivated';

  header: string;
  credit: string;
  openHighResImage: string;
  highResImageLoadFailed: string;
  randomOfTheDayApiUrl: string;
  linkedErrorMessage: Link;
}

export default function RandomPaintingOfTheDay({
  id,
  animated,
  header,
  credit,
  openHighResImage,
  highResImageLoadFailed,
  randomOfTheDayApiUrl,
  linkedErrorMessage,
}: RandomPaintingOfTheDayProps): JSX.Element {
  const [highResImageLoaded, setHighResImageLoaded] = useState<boolean>(false);
  const [highResImageFailed, setHighResImageFailed] = useState<boolean>(false);
  const [highResImageOpened, setHighResImageOpened] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const [painting, setPainting] = useState<Painting | null>(null);

  useEffect(() => {
    getPainting(randomOfTheDayApiUrl)
      .then((poem) => setPainting(poem))
      .catch((error) => setError(error.message));
  }, [randomOfTheDayApiUrl]);

  useEffect(() => {
    if (painting) {
      loadImage(painting.images.highRes)
        .then(() => setHighResImageLoaded(true))
        .catch(() => setHighResImageFailed(true));
    }
  }, [painting]);

  let content: JSX.Element;

  if (error) {
    content = (
      <ErrorScreen linkedMessage={linkedErrorMessage} errorMessages={[error]} />
    );
  } else if (!painting) {
    content = <LoadingScreen />;
  } else {
    let creditTemplateString: string;

    const allowList = [
      'https://metmuseum.github.io',
      'https://api.artic.edu/docs',
    ];

    if (allowList.some((allowedUrl) => allowedUrl === painting.creditRef)) {
      const creditString = credit.replace(
        '${museum}',
        `\$\{${painting.credit}\}`
      );

      creditTemplateString = createLinkElement({
        templateString: creditString,
        urls: [painting.creditRef],
      });
    }

    let openHighResImageElement: JSX.Element;

    if (highResImageFailed) {
      openHighResImageElement = <p>{highResImageLoadFailed}</p>;
    } else {
      openHighResImageElement = (
        <button
          className={styles.openHighResImage}
          disabled={!highResImageLoaded}
          onClick={() => setHighResImageOpened(!highResImageOpened)}
        >
          {openHighResImage}
        </button>
      );
    }

    content = (
      <section>
        <h3>{painting.title}</h3>
        <p>{painting.artist}</p>
        <img
          className={styles.painting}
          src={painting.images.inline}
          alt="Painting of the day"
        />
        <p dangerouslySetInnerHTML={{ __html: creditTemplateString }}></p>
        {openHighResImageElement}
        {highResImageOpened && (
          <HighResImageDialog
            imageUrl={painting.images.highRes}
            onClose={() => setHighResImageOpened(false)}
          />
        )}
      </section>
    );
  }

  return (
    <Slide id={id} animated={animated} className={slideStyles.slide}>
      <>
        <UnitTestCheck componentName="RandomPaintingOfTheDay" />
        <h2>{header}</h2>
        {content}
      </>
    </Slide>
  );
}

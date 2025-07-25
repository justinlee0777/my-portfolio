import slideStyles from '../slide.module.scss';
import styles from './random-painting-of-the-day.module.scss';

import { useEffect, useState, type JSX } from 'react';

import ErrorScreen from '../../../components/error-screen/error-screen';
import LoadingScreen from '../../../components/loading-screen/loading-screen';
import Slide from '../../../components/slide/slide';
import UnitTestCheck from '../../../components/unit-test-check/unit-test-check';
import createLinkElement from '../../../config/create-link-element.function';
import { Painting } from '../../../models/painting.interface';
import { Modal } from '../../../services/modal';
import { useApi } from '../../../utils/hooks/use-api.hook';
import { loadImage } from '../../../utils/load-image.function';
import getPainting from '../../api/get-painting.function';
import { BaseSectionProps } from '../base-section.props';
import HighResImageDialog from './high-res-image-dialog/high-res-image-dialog';

interface RandomPaintingOfTheDayProps extends BaseSectionProps {
  modal: Modal;

  credit: string;
  openHighResImage: string;
  highResImageLoadFailed: string;
  randomOfTheDayApiUrl: string;
}

export default function RandomPaintingOfTheDay({
  id,
  animated,

  modal,

  header,
  credit,
  openHighResImage,
  highResImageLoadFailed,
}: RandomPaintingOfTheDayProps): JSX.Element {
  const [highResImageLoaded, setHighResImageLoaded] = useState<boolean>(false);
  const [highResImageFailed, setHighResImageFailed] = useState<boolean>(false);

  const [painting, error] = useApi<Painting>(() => getPainting());

  useEffect(() => {
    if (painting) {
      loadImage(painting.images.highRes)
        .then(() => setHighResImageLoaded(true))
        .catch(() => setHighResImageFailed(true));
    }
  }, [painting]);

  let content: JSX.Element;

  if (error) {
    content = <ErrorScreen errorMessages={[error]} />;
  } else if (!painting) {
    content = <LoadingScreen />;
  } else {
    let creditTemplateString: string = '';

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
      const dialog = (
        <HighResImageDialog
          imageUrl={painting.images.highRes}
          onClose={() => modal.close()}
        />
      );

      openHighResImageElement = (
        <button
          className={styles.openHighResImage}
          disabled={!highResImageLoaded}
          aria-disabled={!highResImageLoaded}
          onClick={() => modal.set(dialog)}
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

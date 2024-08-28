import ErrorScreen from '../../../components/error-screen/error-screen';
import LoadingScreen from '../../../components/loading-screen/loading-screen';
import Slide from '../../../components/slide/slide';
import FrogSound from '../../../models/frog-sound';
import { useApi } from '../../../utils/hooks/use-api.hook';
import getFrogSound from '../../api/get-frog-sound.function';
import { BaseSectionProps } from '../base-section.props';
import slideStyles from '../slide.module.scss';

interface RandomFactOfTheDayProps extends BaseSectionProps {}

export default function RandomFrogSoundOfTheDay({
  id,
  header,
  animated,
}: RandomFactOfTheDayProps): JSX.Element {
  const [frogSound, error] = useApi<FrogSound>(() => getFrogSound());

  let content: JSX.Element;

  if (error) {
    content = <ErrorScreen errorMessages={[error]} />;
  } else if (!frogSound) {
    content = <LoadingScreen />;
  } else {
    content = (
      <section>
        <iframe
          style={{ borderRadius: '12px' }}
          src={`https://open.spotify.com/embed/track/${frogSound.spotifyTrackId}?utm_source=generator`}
          width="100%"
          height="352"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </section>
    );
  }

  return (
    <Slide id={id} animated={animated} className={slideStyles.slide}>
      <>
        <h2>{header}</h2>
        {content}
      </>
    </Slide>
  );
}

import DeveloperDescription from './components/developer-description/developer-description';
import Resume from './components/resume/resume';
import RpgGame from './components/rpg-game/rpg-game';
import Slide from './components/slide/slide';
import { homepageConfig } from './homepage.config';

function HomePage() {
  const content = [
    <DeveloperDescription
      key="developer-description"
      config={homepageConfig.developerDescription}
    />,
    <RpgGame key="rpg-game" config={homepageConfig.rpgGame} />,
    <Resume key="resume" config={homepageConfig.resume} />,
  ];

  const slides = content.map((component, i) => (
    <Slide key={`slide-${i}`}>{component}</Slide>
  ));

  return <>{slides}</>;
}

export default HomePage;

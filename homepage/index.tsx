import DeveloperDescription from './components/developer-description/developer-description';
import Resume from './components/resume/resume';
import RpgGame from './components/rpg-game/rpg-game';
import Slide from './components/slide/slide';

function HomePage() {
  const content = [
    <DeveloperDescription key="developer-description" />,
    <RpgGame key="rpg-game" />,
    <Resume key="resume" />,
  ];

  const slides = content.map((component, i) => (
    <Slide key={`slide-${i}`}>{component}</Slide>
  ));

  return <>{slides}</>;
}

export default HomePage;

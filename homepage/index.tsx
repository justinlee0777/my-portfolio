import DeveloperDescription from "./components/developer-description/developer-description";
import Resume from "./components/resume/resume";
import Slide from "./components/slide/slide";

function HomePage() {
  return (
    <>
      <Slide>
        <DeveloperDescription />
      </Slide>
      <Slide>
        <Resume />
      </Slide>
    </>
  );
}

export default HomePage;

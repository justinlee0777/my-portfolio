import slideStyles from '../slide.module.scss';

import Slide from '../../../components/slide/slide';
import LoadingScreen from '../../../components/loading-screen/loading-screen';
import { Fact } from '../../fact.interface';
import { getFact } from '../../random-of-the-day.api';
import { createLinkElement } from '../../../config/link.model';
import ErrorScreen from '../../../components/error-screen/error-screen';
import UnitTestCheck from '../../../components/unit-test-check/unit-test-check';
import { useApi } from '../../../utils/hooks/use-api.hook';
import { BaseSectionProps } from '../base-section.props';

interface RandomFactOfTheDayProps extends BaseSectionProps {
  credit: string;
  randomOfTheDayApiUrl: string;
}

export default function RandomFactOfTheDay({
  id,
  animated,

  header,
  credit,
  randomOfTheDayApiUrl,
}: RandomFactOfTheDayProps): JSX.Element {
  const [fact, error] = useApi<Fact>(() => getFact(randomOfTheDayApiUrl));

  let content: JSX.Element;

  if (error) {
    content = <ErrorScreen errorMessages={[error]} />;
  } else if (!fact) {
    content = <LoadingScreen />;
  } else {
    let creditTemplateString: string;

    const allowList = [
      'https://api-ninjas.com',
      'https://uselessfacts.jsph.pl',
    ];

    if (allowList.some((allowedUrl) => allowedUrl === fact.sourceRef)) {
      const creditString = credit.replace('${API_URL}', `\$\{${fact.source}\}`);

      creditTemplateString = createLinkElement({
        templateString: creditString,
        urls: [fact.sourceRef],
      });
    }

    content = (
      <section>
        <p>{fact.content}</p>
        <p dangerouslySetInnerHTML={{ __html: creditTemplateString }}></p>
      </section>
    );
  }

  return (
    <Slide id={id} animated={animated} className={slideStyles.slide}>
      <>
        <UnitTestCheck componentName="RandomFactOfTheDay" />
        <h2>{header}</h2>
        {content}
      </>
    </Slide>
  );
}

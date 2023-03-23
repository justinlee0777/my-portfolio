import slideStyles from '../slide.module.scss';

import { useEffect, useState } from 'react';

import Slide from '../../../components/slide/slide';
import LoadingScreen from '../../../components/loading-screen/loading-screen';
import { Fact } from '../../fact.interface';
import { getFact } from '../../random-of-the-day.api';
import { createLinkElement } from '../../../config/link.model';

interface PoemProps {
  id?: string;
  animated?: 'activated' | 'unactivated';

  header: string;
  credit: string;
  randomOfTheDayApiUrl: string;
}

export default function RandomFactOfTheDay({
  id,
  animated,

  header,
  credit,
  randomOfTheDayApiUrl,
}: PoemProps): JSX.Element {
  const [fact, setFact] = useState<Fact | null>(null);

  useEffect(() => {
    getFact(randomOfTheDayApiUrl).then((fact) => {
      setFact(fact);
    });
  }, []);

  let content: JSX.Element;

  if (!fact) {
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
        <h2>{header}</h2>
        {content}
      </>
    </Slide>
  );
}

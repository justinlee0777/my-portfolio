import { type JSX } from 'react';
import { getBaseProsperoProps } from '../../../src/page-utils/prospero/get-base-props.function';
import { bookConfigs } from '../../../src/prospero/book-config.const';
import DijkstraEssayPage from '../../../src/prospero/dijkstra-essay';
import { ProsperoServerPage } from '../../../src/prospero/prospero-server-page';

export async function getStaticPaths() {
  return {
    paths: bookConfigs.map(({ urlSlug }) => ({
      params: { bookTitle: urlSlug },
    })),
    fallback: false,
  };
}

export async function getStaticProps(args) {
  return {
    props: await getBaseProsperoProps(args),
  };
}

export default function Page(props): JSX.Element {
  if (
    props.book.title === 'On The Cruelty Of Really Teaching Computing Science'
  ) {
    return <DijkstraEssayPage {...props} />;
  } else {
    return <ProsperoServerPage {...props} />;
  }
}

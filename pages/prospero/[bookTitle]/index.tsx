import { type JSX } from 'react';
import { ProsperoLibraryTitleModel } from '../../../src/models/prospero-library-title.model';
import connectToMongoDB from '../../../src/page-utils/prospero/connect-to-mongodb.function';
import { getBaseProsperoProps } from '../../../src/page-utils/prospero/get-base-props.function';
import DijkstraEssayPage from '../../../src/prospero/dijkstra-essay';
import { ProsperoServerPage } from '../../../src/prospero/prospero-server-page';
import TempestPage from '../../../src/prospero/tempest';

export async function getStaticPaths() {
  await connectToMongoDB();

  const bookTitles = await ProsperoLibraryTitleModel.find().lean();

  return {
    paths: bookTitles.map(({ urlSlug }) => ({
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
  switch (props.book.name) {
    case 'On The Cruelty Of Really Teaching Computing Science':
      return <DijkstraEssayPage {...props} />;
    case 'The Tempest':
      return <TempestPage {...props} />;
    default:
      return <ProsperoServerPage {...props} />;
  }
}

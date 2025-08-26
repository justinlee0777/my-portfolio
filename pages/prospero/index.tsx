import { getLibraryProps } from '../../src/page-utils/prospero/get-library-props.function';
import { ProsperoLibraryPage } from '../../src/prospero/prospero-library-page';

export default ProsperoLibraryPage;

export async function getStaticProps() {
  return {
    props: await getLibraryProps(),
  };
}

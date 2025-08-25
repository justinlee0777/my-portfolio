import {
  ProsperoLibraryTitle,
  ProsperoLibraryTitleModel,
} from '../../models/prospero-library-title.model';
import defaultProsperoConfig from '../../prospero/default-prospero.config';
import ProsperoConfig from '../../prospero/prospero.config';
import {
  BasePageProps,
  getBasePageProps,
} from '../get-base-page-props.function';
import connectToMongoDB from './connect-to-mongodb.function';

export interface ProsperoLibraryProps extends BasePageProps {
  books: Array<ProsperoLibraryTitle>;
  config: ProsperoConfig;
}

export async function getLibraryProps(): Promise<ProsperoLibraryProps> {
  const baseProps = await getBasePageProps('en', '', true);

  await connectToMongoDB();

  const books = await ProsperoLibraryTitleModel.find()
    .select('-_id')
    .lean()
    .orFail();

  return {
    ...baseProps,
    config: defaultProsperoConfig,
    books,
  };
}

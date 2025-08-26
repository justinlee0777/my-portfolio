import { ProsperoLibraryTitle } from '../../models/prospero-library-title-models';
import { ProsperoLibraryTitleModel } from '../../models/prospero-library-title.model';
import defaultProsperoConfig from '../../prospero/default-prospero.config';
import ProsperoConfig from '../../prospero/prospero.config';
import {
  BasePageProps,
  getBasePageProps,
} from '../get-base-page-props.function';
import connectToMongoDB from './connect-to-mongodb.function';

export interface ProsperoPageProps extends BasePageProps {
  book: ProsperoLibraryTitle;
  config: ProsperoConfig;
}

export async function getBaseProsperoProps({
  params,
}): Promise<ProsperoPageProps> {
  const baseProps = await getBasePageProps('en', '', true);

  const bookTitle = params?.bookTitle ?? '';

  await connectToMongoDB();

  const book = await ProsperoLibraryTitleModel.findOne({ urlSlug: bookTitle })
    .select('-_id')
    .lean()
    .orFail();

  return {
    ...baseProps,
    config: defaultProsperoConfig,
    book,
  };
}

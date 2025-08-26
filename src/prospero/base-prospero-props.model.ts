import { type BooksElement } from 'prospero/types';
import { ProsperoLibraryTitle } from '../models/prospero-library-title-models';
import type ProsperoConfig from './prospero.config';

export interface BaseProsperoProps {
  config: ProsperoConfig;
}

export interface ProsperoBookProps extends BaseProsperoProps {
  createBooks: (() => BooksElement) | undefined;
  bookTitle: string;
  bookAuthor: string;
}

export interface ProsperoLibraryProps extends BaseProsperoProps {
  books: Array<ProsperoLibraryTitle>;
}

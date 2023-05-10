import styles from './index.module.scss';

import {
  BooksComponent,
  BookComponent,
  DefaultBookThemeClassName,
  SinglePageBookPreset,
  DoublePageBookPreset,
} from 'prospero/web';

import ProsperoPage from './base-page';
import { TempestPageProps } from '../page-utils/prospero/get-tempest-props.function';

export default function TempestPage({
  config,
  pages,
}: TempestPageProps): JSX.Element {
  const books = BooksComponent({
    children: [
      BookComponent(
        pages,
        {
          ...SinglePageBookPreset(),
        },
        { classnames: [styles.book, DefaultBookThemeClassName] }
      ),
      BookComponent(
        pages,
        {
          ...DoublePageBookPreset(),
          media: { minWidth: 1125 },
        },
        { classnames: [styles.book, DefaultBookThemeClassName] }
      ),
    ],
  });

  return (
    <ProsperoPage
      config={config}
      books={books}
      bookTitle="The Tempest"
      bookAuthor="William Shakespeare"
    ></ProsperoPage>
  );
}

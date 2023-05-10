import styles from './index.module.scss';

import {
  BooksComponent,
  BookComponent,
  SinglePageBookPreset,
  DoublePageBookPreset,
  DefaultBookThemeClassName,
} from 'prospero/web';

import ProsperoPage from './base-page';
import { DijkstraEssayPageProps } from '../page-utils/prospero/get-dijkstra-essay-props.function';

export default function DijkstraEssayPage({
  config,
  galaxyFold,
  iphoneXR,
}: DijkstraEssayPageProps): JSX.Element {
  const books = BooksComponent({
    children: [
      BookComponent(
        galaxyFold,
        {
          ...SinglePageBookPreset(),
        },
        { classnames: [styles.book, DefaultBookThemeClassName] }
      ),
      BookComponent(
        iphoneXR,
        {
          ...SinglePageBookPreset(),
          media: { minWidth: 414 },
        },
        { classnames: [styles.book, DefaultBookThemeClassName] }
      ),
      BookComponent(
        iphoneXR,
        {
          ...DoublePageBookPreset(),
          media: { minWidth: 818 },
        },
        { classnames: [styles.book, DefaultBookThemeClassName] }
      ),
    ],
  });

  return (
    <ProsperoPage
      config={config}
      books={books}
      bookTitle="On the cruelty of really teaching computing science"
      bookAuthor="Edsger W. Dijkstra"
    ></ProsperoPage>
  );
}

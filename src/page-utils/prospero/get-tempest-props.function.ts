import { Pages } from 'prospero/server';
import { PagesOutput, PageStyles } from 'prospero/types';
import { join } from 'path';
import { cwd } from 'process';

import {
  getBaseProsperoProps,
  ProsperoPageProps,
} from './get-base-props.function';
import readFile from '../../utils/read-file.function';

export interface TempestPageProps extends ProsperoPageProps {
  pages: PagesOutput;
}

export async function getStaticProps(): Promise<{ props: TempestPageProps }> {
  const props = await getBaseProsperoProps();

  const text = await readFile(join(cwd(), './src/prospero/texts/tempest.txt'));

  const pageStyles: PageStyles = {
    computedFontSize: '12px',
    computedFontFamily: 'Bookerly',
    lineHeight: 24,
    width: 375,
    height: 667,
    padding: {
      top: 36,
      right: 12,
      bottom: 36,
      left: 12,
    },
  };

  const baseBookerlyPath = join(cwd(), 'public/Bookerly');

  const pages = new Pages(pageStyles, text, [], {
    fontLocation: [
      {
        url: join(baseBookerlyPath, '/Bookerly-Regular.ttf'),
      },
      {
        url: join(baseBookerlyPath, '/Bookerly-Bold.ttf'),
        weight: 'bold',
      },
      {
        url: join(baseBookerlyPath, '/Bookerly-Italic.ttf'),
        style: 'italic',
      },
    ],
    html: true,
  });

  return {
    props: {
      ...props,
      pages: pages.getData(),
    },
  };
}

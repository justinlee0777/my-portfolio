import { Pages } from 'prospero/server';
import { PagesOutput, PageStyles } from 'prospero/types';
import { join } from 'path';
import { cwd } from 'process';

import { BasePageProps } from '../get-base-page-props.function';
import ProsperoConfig from '../../prospero/prospero.config';
import { getFontUrl } from '../../config/load-font.function';
import { Font } from '../../config/font.enum';
import { getBaseProsperoProps } from './get-base-props.function';
import readFile from '../../utils/read-file.function';

export interface TempestPageProps extends BasePageProps {
  config: ProsperoConfig;
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

  const pages = new Pages(pageStyles, text, [], {
    fontLocation: join(cwd(), 'public', getFontUrl(Font.BOOKERLY)),
    html: true,
  });

  return {
    props: {
      ...props,
      pages: pages.getData(),
    },
  };
}

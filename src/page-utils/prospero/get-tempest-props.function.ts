import { HTMLProcessor, LoaderBuilder, PagesBuilder } from 'prospero/server';
import { PagesOutput } from 'prospero/types';
import { join } from 'path';
import { cwd } from 'process';

import { BasePageProps } from '../get-base-page-props.function';
import ProsperoConfig from '../../prospero/prospero.config';
import { getFontUrl } from '../../config/load-font.function';
import { Font } from '../../config/font.enum';
import { getBaseProsperoProps } from './get-base-props.function';

export interface TempestPageProps extends BasePageProps {
  config: ProsperoConfig;
  pages: PagesOutput;
}

export async function getStaticProps(): Promise<{ props: TempestPageProps }> {
  const props = await getBaseProsperoProps();

  const loaderBuilder = await LoaderBuilder.fromFile(
    join(cwd(), './src/prospero/texts/tempest.txt')
  );
  const text = loaderBuilder.getText();

  const pages = new PagesBuilder()
    .setFont(
      '12px',
      'Bookerly',
      join(cwd(), 'public', getFontUrl(Font.BOOKERLY))
    )
    .setLineHeight(24)
    .setPadding({
      top: 36,
      right: 12,
      bottom: 36,
      left: 12,
    })
    .setText(text)
    .setProcessors([new HTMLProcessor()])
    .addSize(375, 667)
    .build()
    .at(0)
    .getData();

  return {
    props: {
      ...props,
      pages,
    },
  };
}

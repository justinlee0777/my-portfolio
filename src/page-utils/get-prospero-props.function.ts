import { HTMLProcessor, LoaderBuilder, PagesBuilder } from 'prospero/server';
import { PagesOutput } from 'prospero/types';
import { join } from 'path';
import { cwd } from 'process';

import {
  BasePageProps,
  getBasePageProps,
} from './get-base-page-props.function';
import ProsperoConfig from '../prospero/prospero.config';
import defaultProsperoConfig from '../prospero/default-prospero.config';
import { getFontUrl } from '../config/load-font.function';
import { Font } from '../config/font.enum';

export interface ProsperoPageProps extends BasePageProps {
  config: ProsperoConfig;
  pages: PagesOutput;
}

export async function getStaticProps(): Promise<{ props: ProsperoPageProps }> {
  const baseProps = await getBasePageProps('en', '', true);

  const loaderBuilder = await LoaderBuilder.fromFile(
    join(cwd(), './src/prospero/tempest.txt')
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
      top: 12,
      right: 12,
      bottom: 12,
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
      ...baseProps,
      config: defaultProsperoConfig,
      pages,
    },
  };
}

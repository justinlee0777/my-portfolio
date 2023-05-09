import { IndentProcessor, LoaderBuilder, PagesBuilder } from 'prospero/server';
import { PagesOutput } from 'prospero/types';
import { join } from 'path';
import { cwd } from 'process';

import { BasePageProps } from '../get-base-page-props.function';
import ProsperoConfig from '../../prospero/prospero.config';
import { getFontUrl } from '../../config/load-font.function';
import { Font } from '../../config/font.enum';
import { getBaseProsperoProps } from './get-base-props.function';

export interface DijkstraEssayPageProps extends BasePageProps {
  config: ProsperoConfig;
  galaxyFold: PagesOutput;
  iphoneXR: PagesOutput;
}

export async function getStaticProps(): Promise<{
  props: DijkstraEssayPageProps;
}> {
  const props = await getBaseProsperoProps();

  const loaderBuilder = await LoaderBuilder.fromFile(
    join(
      cwd(),
      './src/prospero/texts/on-the-cruelty-of-really-teaching-computing-science.txt'
    )
  );
  const text = loaderBuilder.getText();

  const [galaxyFold] = new PagesBuilder()
    .setLineHeight(28)
    .setPadding({
      top: 12,
      right: 12,
      bottom: 12,
      left: 12,
    })
    .setText(text)
    .setProcessors([new IndentProcessor(5)])
    .setFont(
      '14px',
      'Bookerly',
      join(cwd(), 'public', getFontUrl(Font.BOOKERLY))
    )
    .addSize(280, 653)
    .build();

  const [iphoneXR] = new PagesBuilder()
    .setLineHeight(32)
    .setPadding({
      top: 36,
      right: 24,
      bottom: 36,
      left: 24,
    })
    .setText(text)
    .setProcessors([new IndentProcessor(5)])
    .setFont(
      '16px',
      'Bookerly',
      join(cwd(), 'public', getFontUrl(Font.BOOKERLY))
    )
    .addSize(414, 700)
    .build();

  return {
    props: {
      ...props,
      galaxyFold: galaxyFold.getData(),
      iphoneXR: iphoneXR.getData(),
    },
  };
}

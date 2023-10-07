import { Pages, IndentTransformer } from 'prospero/server';
import { PagesOutput, PageStyles } from 'prospero/types';
import { join } from 'path';
import { cwd } from 'process';

import {
  ProsperoPageProps,
  getBaseProsperoProps,
} from './get-base-props.function';
import readFile from '../../utils/read-file.function';
import getFontUrl from '../../config/get-font-url.function';
import Font from '../../models/font.enum';

export interface DijkstraEssayPageProps extends ProsperoPageProps {
  galaxyFold: PagesOutput;
  iphoneXR: PagesOutput;
}

export async function getStaticProps(): Promise<{
  props: DijkstraEssayPageProps;
}> {
  const props = await getBaseProsperoProps();

  const text = await readFile(
    join(
      cwd(),
      './src/prospero/texts/on-the-cruelty-of-really-teaching-computing-science.txt'
    )
  );

  const indentTransformer = new IndentTransformer(5);
  const bookerlyLocation = join(cwd(), 'public', getFontUrl(Font.BOOKERLY));

  const galaxyFoldStyles: PageStyles = {
    computedFontFamily: 'Bookerly',
    computedFontSize: '14px',
    lineHeight: 28,
    width: 280,
    height: 653,
    padding: {
      top: 12,
      right: 12,
      bottom: 12,
      left: 12,
    },
  };

  const galaxyFold = new Pages(galaxyFoldStyles, text, [indentTransformer], {
    fontLocation: bookerlyLocation,
  }).getData();

  const iphoneXRStyles: PageStyles = {
    computedFontFamily: 'Bookerly',
    computedFontSize: '16px',
    lineHeight: 32,
    width: 414,
    height: 700,
    padding: {
      top: 36,
      right: 24,
      bottom: 36,
      left: 24,
    },
  };

  const iphoneXR = new Pages(iphoneXRStyles, text, [indentTransformer], {
    fontLocation: bookerlyLocation,
  }).getData();

  return {
    props: {
      ...props,
      galaxyFold,
      iphoneXR,
    },
  };
}

import * as ProsperoServer from 'prospero/server';
import * as ProsperoWeb from 'prospero/web';
import { useEffect, useMemo, useRef } from 'react';

import { getBasePageProps } from '../../src/page-utils/get-base-page-props.function';
import { readFile } from 'fs';
import { join } from 'path';
import { getFontUrl } from '../../src/config/load-font.function';
import { Font } from '../../src/config/font.enum';
import { markdownToHtmlString } from '../../src/utils/markdown-to-html-string.function';
import matter from 'gray-matter';

export default function PropseroDemo({ pagesOutput }): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log(ProsperoWeb)
    containerRef.current?.appendChild(
      ProsperoWeb.BooksComponent({
        children: [
          ProsperoWeb.BookComponent(pagesOutput, { pagesShown: 1 }),
          ProsperoWeb.BookComponent(pagesOutput, { pagesShown: 2, media: { minWidth: 750 } }),
        ],
      }));
  }, [containerRef]);
  return <div style={{ margin: '2em auto' }} ref={containerRef} />;
}

export const getStaticProps = async () => {
  const props = await getBasePageProps('en', undefined, true);

  const file = join(
    process.cwd(),
    'src/musings/musing-files',
    'sap-retrospective.md'
  );
  const text = await new Promise<string>((resolve, reject) =>
    readFile(file, 'utf8', (err, file) => (err ? reject(err) : resolve(file)))
  );
  const { content } = matter(text);

  /*
    const response = await fetch('https://api.iamjustinlee.com/cover-letter/default');
    const text = await response.text();
    */

  const textContent = await markdownToHtmlString(content);
  console.log(ProsperoServer);
  const [pages] = new ProsperoServer.PagesBuilder()
    .setFont(
      '16px',
      'Bookerly',
      join(process.cwd(), 'public', getFontUrl(Font.BOOKERLY))
    )
    .setLineHeight(32)
    .setPadding({
      top: 18,
      right: 18,
      bottom: 18,
      left: 18,
    })
    .setText(textContent)
    .setProcessors([new ProsperoServer.IndentProcessor(5), new ProsperoServer.HTMLProcessor()])
    .addSize(375, 667)
    .build();

  return {
    props: {
      ...props,
      pagesOutput: pages.getData(),
    },
  };
};

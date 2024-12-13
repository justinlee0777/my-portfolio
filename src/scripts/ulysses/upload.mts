import type {
  PagesAsIndicesOutput,
  TableOfContentsSection,
} from 'prospero/types';

import { capitalize } from 'lodash-es';
import {
  desktopStyles,
  mobileStyles,
} from '../../consts/ulysses-styles.const.js';
import workOnChapter from './work-on-chapter.mjs';

const chapters = [
  'telemachus',
  'nestor',
  'proteus',
  'calypso',
  'lotus-eaters',
  'hades',
  'aeolus',
  'lestrygonians',
  'scylla-and-charybdis',
  'wandering-rocks',
  'sirens',
  'cyclops',
  'nausicaa',
  'oxen-of-the-sun',
  'circe',
  'eumaeus',
  'ithaca',
  'penelope',
];

const responses = await Promise.all(
  chapters.map(async (chapter) => ({
    ...(await workOnChapter({
      mobileStyles,
      desktopStyles,
      filename: `./src/assets/pages/ulysses/${chapter}.txt`,
    })),
    chapter,
  }))
);

let desktopCompiledText = '';
let mobileCompiledText = '';

let mobile: PagesAsIndicesOutput['pages'] = [];
let mobileIndex = 0;

let desktop: PagesAsIndicesOutput['pages'] = [];
let desktopIndex = 0;

const mobileChapters: Array<TableOfContentsSection> = [],
  desktopChapters: Array<TableOfContentsSection> = [];

responses.forEach((response) => {
  const chapterTitle = response.chapter.split('-').map(capitalize).join(' ');

  mobileChapters.push({
    title: chapterTitle,
    pageNumber: mobile.length,
  });
  desktopChapters.push({
    title: chapterTitle,
    pageNumber: desktop.length,
  });

  desktopCompiledText += response.desktop.text;
  mobileCompiledText += response.mobile.text;

  response.mobile.pages.forEach((mobilePage) => {
    mobile.push({
      beginIndex: mobileIndex + mobilePage.beginIndex,
      endIndex: mobileIndex + mobilePage.endIndex,
    });
  });

  response.desktop.pages.forEach((desktopPage) => {
    desktop.push({
      beginIndex: desktopIndex + desktopPage.beginIndex,
      endIndex: desktopIndex + desktopPage.endIndex,
    });
  });

  // Add an empty page.
  desktop.push({
    beginIndex: desktop.at(-1).endIndex,
    endIndex: desktop.at(-1).endIndex,
  });

  mobileIndex += response.mobile.pages.at(-1).endIndex;
  desktopIndex += response.desktop.pages.at(-1).endIndex;
});

const mobilePages: PagesAsIndicesOutput & {
  chapters: Array<TableOfContentsSection>;
} = {
  pages: mobile,
  pageStyles: mobileStyles,
  text: mobileCompiledText,
  chapters: mobileChapters,
};

const desktopPages: PagesAsIndicesOutput & {
  chapters: Array<TableOfContentsSection>;
} = {
  pages: desktop,
  pageStyles: desktopStyles,
  text: desktopCompiledText,
  chapters: desktopChapters,
};

const url = 'https://iamjustinlee.com/api';

try {
  let response = await fetch(`${url}/prospero/texts/ulysses/mobile`, {
    method: 'PUT',
    body: JSON.stringify(mobilePages),
  });

  console.log(response.status);

  response = await fetch(`${url}/prospero/texts/ulysses/desktop`, {
    method: 'PUT',
    body: JSON.stringify(desktopPages),
  });

  console.log(response.status);

  process.exit(0);
} catch (error) {
  console.log(error);

  process.exit(1);
}

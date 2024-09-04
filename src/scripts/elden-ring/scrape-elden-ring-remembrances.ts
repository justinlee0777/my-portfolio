import { chromium, Locator } from 'playwright';
import EldenRingScrapeResults from './elden-ring-scrape-results.interface';

export default async function scrapeEldenRingRemembrances(): Promise<
  Array<EldenRingScrapeResults>
> {
  const browser = await chromium.launch();

  const context = await browser.newContext();

  const page = await context.newPage();

  const baseUrl = `https://eldenring.fandom.com`;

  const url = `${baseUrl}/wiki/Remembrances`;

  await page.goto(url, { waitUntil: 'domcontentloaded' });

  const tableRowSelectors = await page
    .locator('.wikitable')
    .locator('tr')
    .locator('a')
    .all();

  const batchedTableRowSelectors: Array<Array<Locator>> = [];

  let pageNumber = 0;

  while (pageNumber < tableRowSelectors.length) {
    const size = 5;
    const nextPageNumber = pageNumber + size;

    batchedTableRowSelectors.push(
      tableRowSelectors.slice(pageNumber, nextPageNumber)
    );

    pageNumber += size;
  }

  const content: Array<EldenRingScrapeResults> = [];

  for (const batch of batchedTableRowSelectors) {
    const descriptions = await Promise.all(
      batch.map(async (selector) => {
        const remembrancePage = await context.newPage();

        const path = await selector.getAttribute('href');

        await remembrancePage.goto(`${baseUrl}/${path}`, {
          waitUntil: 'domcontentloaded',
        });

        const paragraphs = await remembrancePage
          .locator('.wds-tabber')
          .locator('.wds-is-current.wds-tab__content')
          .locator('p')
          .all();

        const itemName = await remembrancePage.locator('h1').textContent();
        const textContent = await Promise.all(
          paragraphs.map((paragraph) => paragraph.textContent())
        );

        await remembrancePage.close();

        const trimmedItemName = itemName!.trim();

        return {
          itemName: trimmedItemName,
          chunks: [
            textContent
              .map((text) => text!.trim())
              .filter((text) => text.length !== 0)
              .join('\n'),
          ],
          itemType: 'remembrance' as const,
          referenceUrl: remembrancePage.url(),
        };
      })
    );

    content.push(...descriptions);
  }

  await browser.close();

  return content;
}

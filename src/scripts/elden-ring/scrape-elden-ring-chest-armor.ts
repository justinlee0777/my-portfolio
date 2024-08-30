import { chromium, Locator } from 'playwright';
import EldenRingScrapeResults from './elden-ring-scrape-results.interface';

export default async function* scrapeEldenRingChestArmor(): AsyncGenerator<
  Array<EldenRingScrapeResults>
> {
  console.log('beginning chest armor scrape...');
  const browser = await chromium.launch();

  const context = await browser.newContext();

  const page = await context.newPage();

  const baseUrl = `https://eldenring.fandom.com`;

  const url = `${baseUrl}/wiki/Category:Chest`;

  const content: Array<EldenRingScrapeResults> = [];
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  const tableRowSelectors = await page
    .locator('.category-page__members')
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

  for (const batch of batchedTableRowSelectors) {
    const descriptions = await Promise.all(
      batch.map(async (selector) => {
        try {
          const weaponPage = await context.newPage();

          const path = await selector.getAttribute('href');

          await weaponPage.goto(`${baseUrl}/${path}`, {
            waitUntil: 'domcontentloaded',
          });

          const paragraphs = await weaponPage
            .locator('h2:has-text("Description") + div')
            .locator('.wds-tabber')
            .locator('.wds-is-current.wds-tab__content')
            .locator('p')
            .all();

          const itemName = await weaponPage.locator('h1').textContent();
          const textContent = await Promise.all(
            paragraphs.map((paragraph) => paragraph.textContent())
          );

          await weaponPage.close();

          const trimmedItemName = itemName.trim();

          return {
            itemName: trimmedItemName,
            chunks: [
              textContent
                .map((text) => text.trim())
                .filter((text) => text.length !== 0)
                .join('\n'),
            ],
            itemType: 'chest armor' as const,
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      })
    );

    content.push(
      ...descriptions.filter((description) => description?.chunks.at(0))
    );

    console.log({
      lastContent: content.at(-1),
    });
  }

  await browser.close();

  yield content;
}

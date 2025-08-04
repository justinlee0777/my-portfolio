import { GutenbergScrapeConfig } from './gutenberg-scrape-config.interface';

export const config: GutenbergScrapeConfig = {
  url: `https://www.gutenberg.org/cache/epub/9371/pg9371-images.html`,
  sectionHeadingSelector: '.t3',
  contentContainerSelector: 'body',
  ignore: 'h3',
};

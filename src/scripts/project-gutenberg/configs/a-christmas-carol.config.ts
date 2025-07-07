import { GutenbergScrapeConfig } from './gutenberg-scrape-config.interface';

export const config: GutenbergScrapeConfig = {
  url: `https://www.gutenberg.org/files/46/46-h/46-h.htm`,
  sectionHeadingSelector: 'h4',
  contentContainerSelector: '.book',
};

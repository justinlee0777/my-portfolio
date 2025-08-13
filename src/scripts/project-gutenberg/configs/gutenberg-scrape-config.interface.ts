export interface GutenbergScrapeConfig {
  url: string;
  sectionHeadingSelector: string;

  contentContainerSelector?: string;
  ignore?: string;
  transform?: (textContent: string) => string;
}

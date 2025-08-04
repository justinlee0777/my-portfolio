export interface GutenbergScrapeConfig {
  url: string;
  sectionHeadingSelector: string;

  contentContainerSelector?: string;
  ignore?: string;
}

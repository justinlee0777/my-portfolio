export interface MusingConfig {
  slug: string;
  display: {
    title: string;
    description: string;
    timestamp: string;
    contentHtml: string;
  };
  seo: {
    title: string;
    description: string;
  };
}

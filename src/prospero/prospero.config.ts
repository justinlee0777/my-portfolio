import LinkedString from '../models/linked-string.model';

export default interface ProsperoConfig {
  seo: {
    title: string;
    description: string;
  };
  textContent: {
    header: string;
    description: Array<string | LinkedString>;
  };
  links: Array<{
    url: string;
    text: string;
  }>;
}

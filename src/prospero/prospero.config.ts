import { Link } from '../config/link.model';

export default interface ProsperoConfig {
  seo: {
    title: string;
    description: string;
  };
  textContent: {
    header: string;
    description: Array<string | Link>;
  };
  links: Array<{
    url: string;
    text: string;
  }>;
}

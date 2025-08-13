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
}

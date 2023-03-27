import { Link } from '../config/link.model';

export interface CoverLetterConfig {
  textContent: {
    secondSectionOpening: string;
    ending: Array<string | Link>;
  };
}

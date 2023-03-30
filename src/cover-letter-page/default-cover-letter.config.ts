import { CoverLetterConfig } from './cover-letter.config';

export const defaultCoverLetterConfig: CoverLetterConfig = {
  textContent: {
    header: 'Hello, I am <span data-emphasized>Justin Lee</span>.',
    companySpecificCoverErrorMessage:
      'This section of the cover was unable to load. The URL may be malformed. If you have any time beyond reading this letter, I would greatly appreciate a message that this page failed.',
  },
};

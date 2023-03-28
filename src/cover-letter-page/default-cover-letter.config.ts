import { CoverLetterConfig } from './cover-letter.config';

export const defaultCoverLetterConfig: CoverLetterConfig = {
  textContent: {
    secondSectionOpening: "Now, to show that I've done my research:",
    ending: [
      'Thank you for reading my application to the end, and I hope to hear from you soon.',
      'And if you have any suggestions for the site or bugs to report, please drop me a line at leej40@outlook.com.',
    ],
    companySpecificCoverErrorMessage:
      'This section of the cover was unable to load. The URL may be malformed. If you have any time beyond reading this letter, I would greatly appreciate a message that this page failed.',
  },
};

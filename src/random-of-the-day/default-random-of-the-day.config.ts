import { RandomOfTheDayConfig, RandomType } from './random-of-the-day.config';

export const defaultRandomOfTheDayConfig: RandomOfTheDayConfig = {
  seo: {
    title: 'Random of the Day',
    description:
      'Random things every work day to delight or amuse remote teams after a Scrum daily.',
  },
  textContent: {
    header: 'Random of the Day',
    randoms: [
      {
        text: 'Poem',
        type: RandomType.POEM,
      },
      {
        text: 'Fact',
        type: RandomType.FACT,
      },
      {
        text: 'Painting',
        type: RandomType.PAINTING,
      },
    ],
    description: [
      'The Daily Scrum is the most visible face of Scrum.',
      'It is held at the same place at the same time and it is always 15 minutes long.',
      'The Daily requires discipline. A team can be measured by their Daily and the Daily is a powerful tool for the team.',
      'However, during the pandemic, teams lost precious "watercooler talk", by which they related to each other personally.',
      'My team mate Adriaan came up with the Random Fact of the Day during retro. Before that, we had a Random Chant of the Day.',
      'To preserve our watercooler talk, I have created a few utilities for generating random things for a weekday.',
      'Do these after standup is over and remind anyone and everyone they are free not to participate.',
    ],
    hideControls: 'Hide controls',
    showControls: 'Show controls',
    errorMessage: {
      templateString:
        "This resource could not be loaded. Please contact ${leej40@outlook.com} and, if possible, add a screenshot and the cURL to the email's body.",
      urls: ['mailto:leej40@outlook.com'],
    },
    poemOfTheDay: {
      header: 'Poem of the Day',
    },
    factOfTheDay: {
      header: 'Fact of the Day',
      credit: 'Fact taken from ${API_URL}',
    },
    paintingOfTheDay: {
      header: 'Painting of the Day',
      credit: 'From the collection of ${museum}',
      openHighResImage: 'Open High Resolution Image',
      highResImageLoadFailed: 'High resolution image could not be loaded.',
    },
  },
};

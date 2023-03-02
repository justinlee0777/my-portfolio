import { HomepageConfig } from './homepage.config';

export const homepageConfig: HomepageConfig = {
  developerDescription: {
    textContent: {
      name: 'Justin Lee',
      prompt: 'Who am I?',
      tongueInCheck: 'Good question. I also am looking for that answer.',
      profileCaption: 'Profile picture courtesy of OpenAI',
      profileDescription:
        'Fake profile picture generated by OpenAI using a "Justin Lee, web developer" prompt',
      profileErrorMessage: {
        templateString:
          'Hmm, the profile picture is not loading. Please send me an email at ${leej40@outlook.com} and I will fix it ASAP.',
        urls: ['mailto:leej40@outlook.com'],
      },
    },
  },
  settings: {
    textContent: {
      header: 'What do you think of the site?',
      subheader: "Doesn't look good?",
      prompt:
        'You can change certain things with the site to suit your liking. Such as...',
      marqueeExplanation: {
        templateString:
          'This MDN ${article} describes best what the marquee element had been.',
        urls: [
          'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/marquee',
        ],
      },
    },
  },
  resume: {
    textContent: {
      lines: [
        'I am a web developer. I built this site using React and Next.js, and I host it myself. All for fun.',
        {
          templateString:
            'I have worked with ${Unbound Commerce} and ${SAP} to make B2B websites a bit more complex than this one.',
          urls: [
            'https://www.unboundcommerce.com',
            'https://www.sap.com/products/crm/e-commerce-platforms.html',
          ],
        },
        'Though these are more fun.',
        {
          templateString:
            'Contact me at ${leej40@outlook.com} if the site amuses you or for anything else.',
          urls: ['mailto:leej40@outlook.com'],
        },
        {
          templateString: 'The source code of the site is on ${GitHub}.',
          urls: ['https://github.com/justinlee0777'],
        },
      ],
    },
  },
};

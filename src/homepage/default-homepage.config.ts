import { HomepageConfig } from './homepage.config';

export const homepageConfig: HomepageConfig = {
  seo: {
    title: 'Justin Lee - Web Developer',
    description:
      'Tongue-in-cheek portfolio site for Justin Lee, web developer. Contains demos of several open-source apps.',
  },
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
      explanation: {
        translation: {
          templateString:
            'All languages except English were translated through ${Google Cloud Translation}.',
          urls: ['https://cloud.google.com/translate'],
        },
        marquee: {
          templateString:
            'This MDN ${article} describes best what the marquee element had been.',
          urls: [
            'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/marquee',
          ],
        },
        tiltPrism: {
          templateString: 'Courtesy towards ${Andy Clymer}',
          urls: ['https://fonts.google.com/specimen/Tilt+Prism'],
        },
        eater: {
          templateString: 'Courtesy towards ${Typomondo}',
          urls: ['https://fonts.google.com/specimen/Eater'],
        },
        developerMode:
          'Developer mode shows the passing/failing unit tests for components and other things usually hidden from the end user.',
      },
    },
  },
  resume: {
    textContent: {
      lines: [
        `I am a web developer. This site's stack uses Next.JS for the backend, MongoDB for database, and React (naturally from Next.JS).`,
        {
          templateString: `I have quite a bit of experience with Progressive Web Apps, RESTful server design, and product development from my time at \${SAP}.`,
          urls: ['https://www.sap.com/products/crm/commerce-cloud.html'],
        },
        {
          templateString: `I have full-stack experience working with various \${startup} \${companies}.`,
          urls: ['https://www.distro.app', 'https://www.unboundcommerce.com'],
        },
        {
          templateString:
            'Contact me at ${leej40@outlook.com} if the site amuses you or for anything else.',
          urls: ['mailto:leej40@outlook.com'],
        },
      ],
    },
  },
  projects: {
    header: 'Projects',
    description: [
      `In hindsight, and to my misfortune, I have not preserved any of the frontend projects I have developed professionally. Perhaps one day with considerable downtime in my hands I will recreate them for posterity.`,
      `Most of my GitHub projects are written in Vanilla JS, so as to be framework-agnostic.`,
    ],
    entries: [
      {
        header: 'Prospero',
        thumbnail: '/projects/prospero.gif',
        description: 'Render text on the web as a book.',
        url: '/prospero',
      },
      {
        header: 'Random of the Day',
        thumbnail: '/projects/random-of-the-day.png',
        description: 'Random neat thing of the day.',
        url: '/en/random-of-the-day',
      },
      {
        header: 'Buzzword Bingo',
        thumbnail: '/projects/buzzword-bingo.png',
        description:
          'Library that takes in bingo cells and renders them as a bingosheet.',
        url: '/en/buzzword-bingo',
      },
      {
        header: 'Picture-in-Picture JS',
        thumbnail: '/projects/picture-in-picture-js.gif',
        description: 'Render media on a webpage in a draggable overlay.',
        url: '/picture-in-picture-js',
      },
      {
        header: 'Elden Ring Bot',
        thumbnail: '/projects/elden-ring-chatbot.gif',
        description:
          'Extremely silly bot that pulls data about Elden Ring from a database and answers your queries.',
        url: '/elden-ring',
      },
      {
        header: 'Museum',
        thumbnail: '/projects/museum.gif',
        description: 'Renders a museum on the webpage. Another silly idea.',
        url: '/museum',
      },
    ],
  },
};

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
    },
  },
  settings: {
    textContent: {
      header: 'What do you think of the site?',
      subheader: "Doesn't look good?",
      prompt:
        'You can change certain things with the site to suit your liking. Such as...',
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
          templateString: 'The site is stored on ${GitHub}.',
          urls: ['https://github.com/justinlee0777'],
        },
      ],
    },
  },
  rpgGame: {
    textContent: {
      header: 'Puzzle-Like Role Playing Game',
      subheader:
        'The game is played entirely on keyboard. Therefore, it can only be played on desktop.',
      outOfFocusMessage:
        'You have lost control of the game. Please click to continue playing.',
      buttonText: 'Click to play',
    },
    aria: {
      buttonLabel: 'Click to play role-playing game',
    },
    iframeUrl: '/rpg-game/index.html',
  },
};

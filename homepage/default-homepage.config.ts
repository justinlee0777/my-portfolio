import { HomepageConfig } from './homepage.config';

export const homepageConfig: HomepageConfig = {
  developerDescription: {
    textContent: {
      name: 'Justin Lee',
      prompt: 'Who am I?',
      tongueInCheck: 'Good question. I also am looking for that answer.',
      profileCaption: 'Profile picture courtesy of OpenAI',
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
        'I loathe handing out résumés. The work is always more interesting. Contact me at _blank_ if the site amuses you or for anything else.',
      ],
    },
  },
  rpgGame: {
    textContent: {
      header: 'Puzzle-Like Role Playing Game',
      outOfFocusMessage:
        'You have lost control of the game. Please click to continue playing.',
      buttonText: 'Click to play',
    },
    iframeUrl: '/rpg-game/index.html',
  },
};
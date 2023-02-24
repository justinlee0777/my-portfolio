import { renderToString } from 'react-dom/server';
import { Theme } from './theme.enum';

interface Link {
  /** Use ${link text content} to replace with links. The number of ${link text content} should be equal to the number of elements in the 'urls', and the order should be the same. */
  templateString: string;
  urls: Array<string>;
}

export function createLinkElement(link: Link): string {
  const pattern = /\$\{.*?\}/g;

  let index = 0;
  return link.templateString.replaceAll(pattern, (searchTerm) => {
    const url = link.urls[index] ?? '';
    const text = searchTerm.replace(/[\$\{\}]/g, '');

    const htmlString = renderToString(
      <a href={url} rel="noopener noreferrer">
        {text}
      </a>
    );

    index++;

    return htmlString;
  });
}

export interface DeveloperDescriptionConfig {
  textContent: {
    name: string;
    prompt: string;
    tongueInCheck: string;
  };
}

export interface ResumeConfig {
  textContent: {
    lines: Array<string | Link>;
  };
}

export interface RpgGameConfig {
  textContent: {
    header: string;
    outOfFocusMessage: string;
    buttonText: string;
  };
  iframeUrl: string;
}

export interface HomepageConfig {
  defaults: {
    theme: Theme;
  };
  developerDescription: DeveloperDescriptionConfig;
  resume: ResumeConfig;
  rpgGame: RpgGameConfig;
}

export const homepageConfig: HomepageConfig = {
  defaults: {
    theme: Theme.SEA,
  },
  developerDescription: {
    textContent: {
      name: 'Justin Lee',
      prompt: 'Who am I?',
      tongueInCheck: 'Good question. I also am looking for that answer.',
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

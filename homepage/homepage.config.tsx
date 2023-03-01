import { renderToString } from 'react-dom/server';

import { SettingsConfig } from '../config/settings.config';

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
    profileCaption: string;
    profileDescription: string;
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
  aria: {
    buttonLabel: string;
  };
  iframeUrl: string;
}

export interface HomepageConfig {
  developerDescription: DeveloperDescriptionConfig;
  settings: SettingsConfig;
  resume: ResumeConfig;
  rpgGame: RpgGameConfig;
}

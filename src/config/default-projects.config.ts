import { ProjectConfig } from '../models/project-config.model';

export const defaultProjectsConfig: Array<ProjectConfig> = [
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
    url: '/random-of-the-day',
  },
  {
    header: 'Buzzword Bingo',
    thumbnail: '/projects/buzzword-bingo.png',
    description:
      'Library that takes in bingo cells and renders them as a bingosheet.',
    url: '/buzzword-bingo',
  },
  {
    header: 'Picture-in-Picture JS',
    thumbnail: '/projects/picture-in-picture-js.gif',
    description: 'Render media on a webpage in a draggable overlay.',
    url: '/picture-in-picture-js',
  },
  {
    header: 'Chatbot UI Ideas',
    description: `User interfaces adapted for specific chatbot needs.`,
    url: '/chatbot-ideas',
    thumbnail: '/projects/chatbot-ideas.gif',
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
];

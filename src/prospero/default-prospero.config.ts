import ProsperoConfig from './prospero.config';

const defaultProsperoConfig: ProsperoConfig = {
  seo: {
    title: 'Prospero: Render text on the web as a book',
    description:
      'A demo of prospero, software that renders text on the web as a book.',
  },
  textContent: {
    header: 'Prospero: Render text on the web as a book',
    description: [
      'Prospero paginates text on the server and renders the pages on the web in the form of an e-book.',
      'Click on the sides of the page to navigate.',
      'For desktop, the keyboard arrows also navigate.',
      {
        templateString: 'The software is documented ${here}.',
        urls: ['https://github.com/justinlee0777/prospero'],
      },
    ],
  },
  links: [
    {
      text: 'The Tempest by William Shakespeare',
      url: '/prospero',
    },
    {
      text: 'On The Cruelty Of Really Teaching Computing Science by Edsger Dijkstra',
      url: '/prospero/on-the-cruelty-of-really-teaching-computing-science',
    },
    {
      text: 'Ulysses by James Joyce',
      url: '/prospero/ulysses',
    },
    {
      text: 'A Christmas Carol by Charles Dickens',
      url: '/prospero/a-christmas-carol',
    },
  ],
};

export default defaultProsperoConfig;

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
};

export default defaultProsperoConfig;

interface BookConfig {
  title: string;
  author: {
    firstName: string;
    lastName: string;
  };
  urlSlug: string;
}

export const bookConfigs: Array<BookConfig> = [
  {
    title: 'On The Cruelty Of Teaching Computing Science',
    author: {
      firstName: 'Edsger',
      lastName: 'Dijkstra',
    },
    urlSlug: 'on-the-cruelty-of-really-teaching-computing-science',
  },
  {
    title: 'A Christmas Carol',
    author: {
      firstName: 'Charles',
      lastName: 'Dickens',
    },
    urlSlug: 'a-christmas-carol',
  },
  {
    title: 'Ulysses',
    author: {
      firstName: 'James',
      lastName: 'Joyce',
    },
    urlSlug: 'ulysses',
  },
  {
    title: 'The Tempest',
    author: {
      firstName: 'William',
      lastName: 'Shakespeare',
    },
    urlSlug: '',
  },
  {
    title: 'The Praise Of Folly',
    author: {
      firstName: 'Desiderius',
      lastName: 'Erasmus',
    },
    urlSlug: 'the-praise-of-folly',
  },
];

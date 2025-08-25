import 'dotenv/config';

import {
  ProsperoLibraryTitle,
  ProsperoLibraryTitleModel,
} from './src/models/prospero-library-title.model';
import connectToMongoDB from './src/page-utils/prospero/connect-to-mongodb.function';

const titles: Array<ProsperoLibraryTitle> = [
  {
    name: 'Ulysses',
    authorFirstName: 'James',
    authorLastName: 'Joyce',
    fields: ['fiction'],
    tags: ['novel'],
    urlSlug: 'ulysses',
    source: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/cache/epub/4300/pg4300-images.html',
  },
  {
    name: 'The Tempest',
    authorFirstName: 'William',
    authorLastName: 'Shakespeare',
    fields: ['fiction'],
    tags: ['play'],
    urlSlug: 'the-tempest',
    source: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/files/23042/23042-h/23042-h.htm',
  },
  {
    name: 'On The Cruelty Of Really Teaching Computing Science',
    authorFirstName: 'Edsger',
    authorLastName: 'Dijkstra',
    fields: ['computer science'],
    tags: ['essay'],
    urlSlug: 'on-the-cruelty-of-really-teaching-computing-science',
    source: 'Other',
    sourceUrl:
      'https://www.cs.utexas.edu/~EWD/transcriptions/EWD10xx/EWD1036.html',
  },
  {
    name: 'A Christmas Carol',
    authorFirstName: 'Charles',
    authorLastName: 'Dickens',
    fields: ['fiction'],
    tags: ['novella'],
    urlSlug: 'a-christmas-carol',
    source: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/files/46/46-h/46-h.htm',
  },
  {
    name: 'The Praise Of Folly',
    authorFirstName: 'Desiderious',
    authorLastName: 'Erasmus',
    fields: ['philosophy', 'satire'],
    tags: ['essay'],
    urlSlug: 'the-praise-of-folly',
    source: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/cache/epub/9371/pg9371-images.html',
  },
];

connectToMongoDB()
  .then(() => ProsperoLibraryTitleModel.insertMany(titles))
  .then(() => process.exit(0))
  .catch((error) => {
    console.log('Upload failed', error);
    process.exit(1);
  });

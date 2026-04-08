import type { Author, AuthorGroup, MajorEvent } from 'author-map-ui';

import {
  AuthorGroupModel,
  AuthorMajorEventModel,
  AuthorModel,
} from '../../models/author.model';
import connectToMongoDB from '../../page-utils/prospero/connect-to-mongodb.function';

export async function getAuthors(): Promise<Array<Author>> {
  await connectToMongoDB();

  return AuthorModel.find().lean();
}

export async function getMajorEvents(): Promise<Array<MajorEvent>> {
  await connectToMongoDB();

  return AuthorMajorEventModel.find().lean();
}

export async function getAuthorGroups(): Promise<Array<AuthorGroup>> {
  await connectToMongoDB();

  return AuthorGroupModel.find().lean();
}

export interface AuthorMapData {
  authors: Array<Author>;
  majorEvents: Array<MajorEvent>;
  groups: Array<AuthorGroup>;
}

export async function getAuthorMapData(): Promise<AuthorMapData> {
  await connectToMongoDB();

  const [authors, majorEvents, groups] = await Promise.all([
    getAuthors(),
    getMajorEvents(),
    getAuthorGroups(),
  ]);

  return {
    authors,
    majorEvents,
    groups,
  };
}

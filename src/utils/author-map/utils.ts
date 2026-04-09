import type {
  Author,
  AuthorGroup,
  CityCoordinates,
  MajorEvent,
} from 'author-map-ui';

import {
  AuthorGroupModel,
  AuthorMajorEventModel,
  AuthorModel,
} from '../../models/author-map/author.model';
import { CityCoordinatesModel } from '../../models/author-map/city-coordinates.model';
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

export async function getCityCoordinates(): Promise<Array<CityCoordinates>> {
  await connectToMongoDB();

  return CityCoordinatesModel.find().select('-_id').lean();
}

export interface AuthorMapData {
  authors: Array<Author>;
  majorEvents: Array<MajorEvent>;
  groups: Array<AuthorGroup>;
  coordinates: Array<CityCoordinates>;
}

export async function getAuthorMapData(): Promise<AuthorMapData> {
  await connectToMongoDB();

  const [authors, majorEvents, groups, coordinates] = await Promise.all([
    getAuthors(),
    getMajorEvents(),
    getAuthorGroups(),
    getCityCoordinates(),
  ]);

  return {
    authors,
    majorEvents,
    groups,
    coordinates,
  };
}

import { MuseumPartial, TestExitPoint } from '../museum-partial.model';

const height = 8;
const width = 16;

const northExitPoint: TestExitPoint = {
  origin: [0, 0],
  height: 1,
  width,
  metadata: {
    enteringRoomId: 'room-212',
    playerPosition: [3, 4],
  },
};

const southExitPoint: TestExitPoint = {
  origin: [0, height - 1],
  height: 1,
  width,
  metadata: {
    enteringRoomId: 'room-213',
    playerPosition: [4, 1],
  },
};

const eastExitPoint: TestExitPoint = {
  origin: [0, 0],
  height,
  width: 1,
  metadata: {
    enteringRoomId: 'room-210',
    playerPosition: [36, 5],
  },
};

export const museumArgs: MuseumPartial = {
  id: 'room-211',
  height,
  width,
  objects: [],
  walls: [
    {
      origin: [0, 0],
      width: 8,
    },
    {
      origin: [11, 0],
      width: 5,
    },
    {
      origin: [width - 1, 0],
      height,
    },
    {
      origin: [0, height - 1],
      width: 3,
    },
    {
      origin: [6, height - 1],
      width: width - 6,
    },
    {
      origin: [0, 0],
      height: 3,
    },
    {
      origin: [0, 6],
      height: 2,
    },
  ],
  exitPoints: [northExitPoint, southExitPoint, eastExitPoint],
};

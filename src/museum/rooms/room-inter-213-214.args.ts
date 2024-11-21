import { MuseumPartial, TestExitPoint } from '../museum-partial.model';

const height = 5;
const width = 8;

const eastExitPoint: TestExitPoint = {
  origin: [0, 0],
  height,
  width: 1,
  metadata: {
    enteringRoomId: 'room-214',
    playerPosition: [8, 5],
  },
};

const northExitPoint: TestExitPoint = {
  origin: [0, 0],
  width,
  height: 1,
  metadata: {
    enteringRoomId: 'room-213',
    playerPosition: [5, 14],
  },
};

export const museumArgs: MuseumPartial = {
  id: 'room-inter-213-214',
  height,
  width,
  objects: [],
  walls: [
    {
      origin: [0, 0],
      height: 2,
    },
    {
      origin: [0, 0],
      width: 3,
    },
    {
      origin: [width - 2, 0],
      width: 2,
    },
    {
      origin: [width - 1, 0],
      height,
    },
    {
      origin: [0, height - 1],
      width,
    },
  ],
  exitPoints: [eastExitPoint, northExitPoint],
};

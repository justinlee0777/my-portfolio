import { MuseumPartial, TestExitPoint } from '../museum-partial.model';

const height = 8;
const width = 10;

const eastExitPoint: TestExitPoint = {
  origin: [0, 3],
  height: 3,
  width: 1,
  metadata: {
    enteringRoomId: 'room-215',
    playerPosition: [6, 4],
  },
};

const westExitPoint: TestExitPoint = {
  origin: [width - 1, 0],
  height,
  width: 1,
  metadata: {
    enteringRoomId: 'room-inter-213-214',
    playerPosition: [1, 2],
  },
};

export const museumArgs: MuseumPartial = {
  id: 'room-214',
  height,
  width,
  objects: [],
  walls: [
    {
      origin: [0, 0],
      width,
    },
    {
      origin: [0, 0],
      height: 3,
    },
    {
      origin: [0, height - 3],
      height: 3,
    },
    {
      origin: [0, height - 1],
      width,
    },
    {
      origin: [width - 1, 0],
      height: 4,
    },
    {
      origin: [width - 1, height - 2],
      height: 2,
    },
    {
      origin: [0, height - 1],
      width,
    },
  ],
  exitPoints: [eastExitPoint, westExitPoint],
};

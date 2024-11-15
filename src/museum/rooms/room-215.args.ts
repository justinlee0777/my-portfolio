import { MuseumPartial, TestExitPoint } from '../museum-partial.model';

const height = 8;
const width = 8;

const eastExitPoint: TestExitPoint = {
  origin: [0, 3],
  height: 3,
  width: 1,
  metadata: {
    enteringRoomId: 'room-216',
    playerPosition: [19, 4],
  },
};

const westExitPoint: TestExitPoint = {
  origin: [width - 1, 3],
  height: 3,
  width: 1,
  metadata: {
    enteringRoomId: 'room-214',
    playerPosition: [1, 3],
  },
};

export const museumArgs: MuseumPartial = {
  id: 'room-215',
  height,
  width,
  objects: [],
  walls: [
    {
      origin: [0, height - 2],
      height: 2,
    },
    {
      origin: [0, 0],
      height: 3,
    },
    {
      origin: [0, 0],
      width: width - 3,
    },
    {
      origin: [width - 1, 0],
      height: 3,
    },
    {
      origin: [width - 1, height - 3],
      height: 3,
    },
    {
      origin: [0, height - 1],
      width,
    },
  ],
  exitPoints: [eastExitPoint, westExitPoint],
};

import { MuseumPartial, TestExitPoint } from '../museum-partial.model';

const height = 16;
const width = 20;

const southExitPoint: TestExitPoint = {
  origin: [0, height - 1],
  height: 1,
  width,
  metadata: {
    enteringRoomId: 'room-inter-213-214',
    playerPosition: [3, 1],
  },
};

const northExitPoint: TestExitPoint = {
  origin: [0, 0],
  height: 1,
  width,
  metadata: {
    enteringRoomId: 'room-211',
    playerPosition: [3, 6],
  },
};

export const museumArgs: MuseumPartial = {
  id: 'room-213',
  height,
  width,
  objects: [],
  walls: [
    {
      origin: [0, 0],
      height,
    },
    {
      origin: [0, 0],
      width: 4,
    },
    {
      origin: [8, 0],
      width: width - 8,
    },
    {
      origin: [width - 1, 0],
      height,
    },
    {
      origin: [0, height - 1],
      width: 4,
    },
    {
      origin: [8, height - 1],
      width: width - 8,
    },
  ],
  exitPoints: [southExitPoint, northExitPoint],
};

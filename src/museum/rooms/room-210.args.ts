import { MuseumPartial, TestExitPoint } from '../museum-partial.model';

const height = 8;
const width = 38;

const westExitPoint: TestExitPoint = {
  origin: [width - 1, 0],
  height,
  width: 1,
  metadata: {
    enteringRoomId: 'room-211',
    playerPosition: [1, 3],
  },
};

export const museumArgs: MuseumPartial = {
  id: 'room-210',
  height,
  width,
  objects: [],
  walls: [
    {
      origin: [0, 0],
      width,
    },
    {
      origin: [width - 1, 0],
      height: 3,
    },
    {
      origin: [width - 1, 6],
      height: 2,
    },
    {
      origin: [0, height - 1],
      width: 23,
    },
    {
      origin: [26, height - 1],
      width: width - 26,
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
  exitPoints: [westExitPoint],
};

import { ExitPoint, MuseumArgs, Position } from 'museum-html';

export interface TestExitPointData {
  enteringRoomId: string;
  playerPosition: Position;
}

export type TestExitPoint = ExitPoint<TestExitPointData>;

export type MuseumPartial = Omit<
  MuseumArgs<TestExitPointData>,
  'cellSize' | 'playerPosition' | 'registries'
> & { id: string };

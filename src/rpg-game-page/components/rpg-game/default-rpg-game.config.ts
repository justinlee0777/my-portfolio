import { RpgGameConfig } from './rpg-game.config';

export const defaultRpgGameConfig: RpgGameConfig = {
  textContent: {
    header: 'Puzzle-Like Role Playing Game',
    subheader:
      'The game is played entirely on keyboard. Therefore, it can only be played on desktop.',
    outOfFocusMessage:
      'You have lost control of the game. Please click to continue playing.',
  },
  iframeUrl: '/rpg-game-source/index.html',
};

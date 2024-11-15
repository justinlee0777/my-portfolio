import { MuseumArgs, MuseumWallType } from 'museum-html';
import TestPlayerSprite from './player-sprite';

const SPRITE_SIZE = 16;

export const registries: MuseumArgs['registries'] = {
  player: new TestPlayerSprite(),
  tile: {
    draw(drawSprite) {
      const image = new Image();

      return new Promise((resolve) => {
        image.onload = () => {
          drawSprite(image, 0, 0, SPRITE_SIZE, SPRITE_SIZE);

          resolve();
        };

        image.src = '/museum/tile-1.png';
      });
    },
  },
  wall: {
    draw(drawSprite, { wallType }) {
      const image = new Image();

      return new Promise((resolve) => {
        image.onload = () => {
          let sx: number, sy: number;

          switch (wallType) {
            case MuseumWallType.VERTICAL:
              (sx = 0), (sy = SPRITE_SIZE);
              break;
            case MuseumWallType.INTERSECTING:
              (sx = 0), (sy = 0);
              break;
            default:
              (sx = SPRITE_SIZE), (sy = 0);
              break;
          }

          drawSprite(image, sx, sy, SPRITE_SIZE, SPRITE_SIZE);

          resolve();
        };

        image.src = '/museum/wall-1.png';
      });
    },
  },
  object: {
    draw(drawSprite, { object }) {
      if (!('width' in object)) {
        throw new Error('Long paintings need a width.');
      }

      const { sprite, width } = object;

      const image = new Image();

      return new Promise((resolve) => {
        switch (sprite) {
          case 'long-painting':
            image.onload = () => {
              // left side
              drawSprite(image, 0, 0, SPRITE_SIZE, SPRITE_SIZE);

              // middle
              Array(width - 2)
                .fill(undefined)
                .forEach((_, i) => {
                  drawSprite(
                    image,
                    SPRITE_SIZE,
                    0,
                    SPRITE_SIZE,
                    SPRITE_SIZE,
                    i + 1
                  );
                });

              // right side
              drawSprite(
                image,
                SPRITE_SIZE * 2,
                0,
                SPRITE_SIZE,
                SPRITE_SIZE,
                width - 1
              );

              resolve();
            };

            image.src = '/museum/long-painting.png';
            break;
          case 'placard':
            image.onload = () => {
              drawSprite(image, 0, 0, SPRITE_SIZE, SPRITE_SIZE);

              resolve();
            };

            image.src = '/museum/placard.png';
            break;
          case 'fan':
            image.onload = () => {
              drawSprite(image, 0, 0, SPRITE_SIZE, SPRITE_SIZE);

              resolve();
            };

            image.src = '/museum/fan.png';
            break;
          case 'painting':
            image.onload = () => {
              drawSprite(image, 0, 0, SPRITE_SIZE, SPRITE_SIZE);

              resolve();
            };

            image.src = '/museum/painting.png';
            break;
        }
      });
    },
  },
};

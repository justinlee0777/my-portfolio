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

      const { sprite, width, height, metadata } = object;

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
          case 'glass-display':
            const vertical = height > 1;
            const horizontal = width > 1;

            if (!(vertical || horizontal)) {
              throw new Error(
                'Glass display must be at least 2 tiles in length.'
              );
            }

            image.onload = () => {
              if (vertical) {
                // top
                drawSprite(image, 0, 0, SPRITE_SIZE, SPRITE_SIZE, 0, 0);

                // middle
                Array(height - 2)
                  .fill(undefined)
                  .forEach((_, i) => {
                    drawSprite(
                      image,
                      0,
                      SPRITE_SIZE,
                      SPRITE_SIZE,
                      SPRITE_SIZE,
                      0,
                      i + 1
                    );
                  });

                // bottom
                drawSprite(
                  image,
                  0,
                  SPRITE_SIZE * 2,
                  SPRITE_SIZE,
                  SPRITE_SIZE,
                  0,
                  height - 1
                );
              } else {
                const hOffset = metadata?.flipHorizontal ? SPRITE_SIZE : 0;

                // left side
                drawSprite(
                  image,
                  SPRITE_SIZE,
                  hOffset,
                  SPRITE_SIZE,
                  SPRITE_SIZE,
                  0,
                  0
                );

                // middle
                Array(width - 2)
                  .fill(undefined)
                  .forEach((_, i) => {
                    drawSprite(
                      image,
                      SPRITE_SIZE * 2,
                      hOffset,
                      SPRITE_SIZE,
                      SPRITE_SIZE,
                      i + 1,
                      0
                    );
                  });

                // right side
                drawSprite(
                  image,
                  SPRITE_SIZE * 3,
                  hOffset,
                  SPRITE_SIZE,
                  SPRITE_SIZE,
                  width - 1,
                  0
                );
              }

              resolve();
            };

            image.src = '/museum/glass-display.png';

            break;
        }
      });
    },
  },
  frame: {
    async drawFrame(drawSprite, { frameHeight, position: [, y] }) {
      const image = new Image();

      return new Promise((resolve) => {
        image.onload = () => {
          if (y === frameHeight - 1) {
            drawSprite(image, 0, SPRITE_SIZE, SPRITE_SIZE, SPRITE_SIZE);
          } else {
            drawSprite(image, 0, 0, SPRITE_SIZE, SPRITE_SIZE);
          }

          resolve();
        };

        image.src = '/museum/frame.png';
      });
    },
    async drawObject(drawSprite, interaction) {
      const image = new Image();

      return new Promise((resolve) => {
        switch (interaction.sprite) {
          case 'painting':
            image.onload = () => {
              drawSprite(image, 0, 0, SPRITE_SIZE, SPRITE_SIZE);

              resolve();
            };

            image.src = '/museum/painting.png';
            break;
          case 'placard':
            image.onload = () => {
              drawSprite(image, 0, 0, SPRITE_SIZE, SPRITE_SIZE);

              resolve();
            };

            image.src = '/museum/placard.png';
            break;
        }
      });
    },
  },
};

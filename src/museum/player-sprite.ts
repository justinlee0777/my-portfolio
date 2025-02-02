import { DrawSprite, PlayerSprite, PlayerSpriteAction } from 'museum-html';

export enum SpritePosture {
  RIGHT_FOOT_DOWN,
  DOWN_STANDING,
  LEFT_FOOT_DOWN,

  LEFT_FOOT_UP,
  UP_STANDING,
  RIGHT_FOOT_UP,

  LEFT_STANDING,
  LEFT_WALKING,

  RIGHT_STANDING,
  RIGHT_WALKING,
}

export default class TestPlayerSprite implements PlayerSprite {
  private readonly SPRITE_SIZE = 16;

  private spriteSheet: HTMLCanvasElement | undefined;
  private postureSequence: Array<SpritePosture> = [];

  async draw(
    drawSprite: DrawSprite,
    action?: PlayerSpriteAction
  ): Promise<void> {
    if (!this.spriteSheet) {
      const spriteSheet = (this.spriteSheet = document.createElement('canvas'));

      const image = new Image();

      const load = new Promise<void>((resolve) => {
        image.onload = () => {
          const context = spriteSheet.getContext('2d')!;
          context.drawImage(image, 0, 0);
          resolve();
        };
      });

      image.src = '/museum/player-sprite-sheet.png';

      await load;
    }

    const { postureSequence } = this;

    let finalPose: SpritePosture;

    if (action) {
      if (action.type === 'walk') {
        switch (action.direction) {
          case 'up':
            finalPose ??= SpritePosture.LEFT_FOOT_UP;
            break;

          case 'right':
            finalPose = SpritePosture.RIGHT_WALKING;
            break;

          case 'down':
            finalPose ??= SpritePosture.LEFT_FOOT_DOWN;
            break;
          case 'left':
            finalPose = SpritePosture.LEFT_WALKING;
            break;
        }
      } else if (action.type === 'stand') {
        switch (action.direction) {
          case 'up':
            finalPose = SpritePosture.UP_STANDING;
            break;
          case 'right':
            finalPose = SpritePosture.RIGHT_STANDING;
            break;

          case 'down':
            finalPose = SpritePosture.DOWN_STANDING;
            break;
          case 'left':
            finalPose = SpritePosture.LEFT_STANDING;
            break;
        }
      }
    }
    finalPose ??= SpritePosture.DOWN_STANDING;

    this.postureSequence.push(finalPose);

    this.drawSprite(finalPose, drawSprite);

    // Only need to track the last two postures.
    this.postureSequence = postureSequence.slice(-2);
  }

  private drawSprite(posture: SpritePosture, drawSprite: DrawSprite): void {
    const { SPRITE_SIZE } = this;
    drawSprite.context.imageSmoothingEnabled = false;

    drawSprite(
      this.spriteSheet!,
      posture * SPRITE_SIZE,
      0,
      SPRITE_SIZE,
      SPRITE_SIZE
    );
  }

  getDirection(): 'Up' | 'Right' | 'Down' | 'Left' {
    const lastPosture = this.postureSequence.at(-1);

    switch (lastPosture) {
      case undefined:
      case SpritePosture.RIGHT_FOOT_DOWN:
      case SpritePosture.DOWN_STANDING:
      case SpritePosture.LEFT_FOOT_DOWN:
        return 'Down';

      case SpritePosture.LEFT_FOOT_UP:
      case SpritePosture.UP_STANDING:
      case SpritePosture.RIGHT_FOOT_UP:
        return 'Up';

      case SpritePosture.LEFT_STANDING:
      case SpritePosture.LEFT_WALKING:
        return 'Left';

      case SpritePosture.RIGHT_STANDING:
      case SpritePosture.RIGHT_WALKING:
        return 'Right';
    }
  }
}

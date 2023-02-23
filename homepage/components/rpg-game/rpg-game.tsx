import { useEffect, useState } from 'react';
import styles from './rpg-game.module.scss';

const iframeId = 'rpg-game-iframe';

export default function RpgGame(): JSX.Element {
  const [gameOpened, setGameOpened] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);

  let iframeRef: HTMLElement;

  let content: JSX.Element;

  useEffect(() => {
    if (gameOpened) {
      const intervalId = setInterval(() => {
        setFocused(document.activeElement.id === iframeId);
      }, 300);

      return () => clearInterval(intervalId);
    }
  }, [gameOpened]);

  useEffect(() => {
    // Block scrolling if iframe is focused.
    if (focused) {
      document.body.style.overflow = 'hidden';

      // If the user tries to scroll outside of the iframe with their mouse wheel, we lose focus on the iframe.
      document.body.addEventListener(
        'mousewheel',
        () => {
          iframeRef?.blur();
          setFocused(false);
        },
        { passive: true, once: true }
      );
    } else {
      document.body.style.overflow = '';
    }
  }, [focused]);

  if (gameOpened) {
    let outOfFocusMessage: JSX.Element;

    if (!focused) {
      outOfFocusMessage = (
        <span
          className={styles.outOfFocusMessage}
          onClick={() => iframeRef?.focus()}
        >
          You have lost control of the game. Please click to continue playing.
        </span>
      );
    }

    content = (
      <div className={styles.content}>
        {outOfFocusMessage}
        <iframe
          id={iframeId}
          className={styles.rpgGame}
          style={{ opacity: focused ? 1 : 0.5 }}
          src="/rpg-game/index.html"
          ref={(ref) => (iframeRef = ref)}
        />
      </div>
    );
  } else {
    content = (
      <button onClick={() => setGameOpened(true)}>Click to play</button>
    );
  }

  return (
    <>
      <h2>Puzzle-like Role Playing Game</h2>
      {content}
    </>
  );
}

import { useEffect, useState } from 'react';

import { RpgGameConfig } from './rpg-game.config';
import styles from './rpg-game.module.scss';

const iframeId = 'rpg-game-iframe';

export default function RpgGame({
  config,
}: {
  config: RpgGameConfig;
}): JSX.Element {
  const [focused, setFocused] = useState<boolean>(false);

  let iframeRef: HTMLElement;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFocused(document.activeElement.id === iframeId);
    }, 300);

    return () => clearInterval(intervalId);
  }, []);

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

  let outOfFocusMessage: JSX.Element;

  if (!focused) {
    outOfFocusMessage = (
      <span
        className={styles.outOfFocusMessage}
        onClick={() => iframeRef?.focus()}
      >
        {config.textContent.outOfFocusMessage}
      </span>
    );
  }

  const content = (
    <>
      {outOfFocusMessage}
      <iframe
        id={iframeId}
        className={styles.rpgGame}
        style={{ opacity: focused ? 1 : 0.5 }}
        src={config.iframeUrl}
        ref={(ref) => (iframeRef = ref)}
      />
    </>
  );

  const contentContainer = <div className={styles.content}>{content}</div>;

  return (
    <>
      <h2 className={styles.rpgGameHeader}>{config.textContent.header}</h2>
      <h3 className={styles.rpgGameExplanation}>
        {config.textContent.subheader}
      </h3>
      {contentContainer}
    </>
  );
}

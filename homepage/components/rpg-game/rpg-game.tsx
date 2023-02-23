import { useState } from "react";
import styles from "./rpg-game.module.scss";

export default function RpgGame(): JSX.Element {
  const [gameOpened, setGameOpened] = useState<boolean>(false);

  let content: JSX.Element;

  if (gameOpened) {
    content = (
      <iframe className={styles.rpgGame} src="/rpg-game/index.html"></iframe>
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

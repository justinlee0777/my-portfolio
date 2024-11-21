import styles from './museum.module.scss';

import { Museum, Position } from 'museum-html';

import { useEffect, useRef } from 'react';
import Slide from '../components/slide/slide';
import { MuseumPartial, TestExitPoint } from './museum-partial.model';
import { registries } from './registries.const';

export default function MuseumPage() {
  const museumContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (museumContainerRef.current) {
      const museumContainer = museumContainerRef.current;

      async function drawMuseum(
        museumArgs: MuseumPartial,
        playerPosition: Position
      ) {
        museumContainer.innerHTML = '';

        let cellSize: number;

        if (window.innerWidth > 800) {
          cellSize = 48;
        } else {
          cellSize = 32;
        }
        const museum = new Museum({
          cellSize,
          playerPosition,
          registries,
          ...museumArgs,
        });

        museum.onexit = async (exitPoint: TestExitPoint) => {
          let room: MuseumPartial;

          ({ museumArgs: room } = await import(
            `./rooms/${exitPoint.metadata.enteringRoomId}.args`
          ));

          await drawMuseum(room, exitPoint.metadata.playerPosition);
        };

        const museumElement = await museum.draw();

        museumElement.classList.add(styles.museum);

        museum.addKeyListeners();

        museumContainer.appendChild(museumElement);

        museumElement.focus();
      }

      import('./rooms/room-216.args').then(
        ({ museumArgs: initialRoomArgs }) => {
          const playerPosition: Position = [1, 4];
          drawMuseum(initialRoomArgs, playerPosition);
        }
      );

      return () => {
        museumContainer.innerHTML = '';
      };
    }
  }, [museumContainerRef.current]);

  return (
    <Slide className={styles.museumPage}>
      <>
        <div className={styles.museumContainer} ref={museumContainerRef}></div>
        <h1>Museum</h1>
        <p>This is probably the weirdest idea I have ever had.</p>
        <p>
          I was interested if there were any benefits to an audience by
          organizing data in a two-dimensional grid.*
        </p>
        <p>
          Nothing came to mind, except for a museum. Curators can reveal
          interesting relationships between artworks from how a room is laid
          out.
        </p>
        <p>
          In any case, this is a good starting point if ever I have an even
          better idea for this concept.
        </p>
        <p>
          Above is a facsimile of the Asian Art wing of the Metropolitan Museum
          of Art, specifically rooms 210 - 216. Because I love scrolls.
        </p>
        <p>This is - or should be - mobile-friendly.</p>
        <p>
          All of this could not be done without the Met Museum&apos;s{' '}
          <a href="https://metmuseum.github.io">public api</a>.
        </p>
        <p>
          The sprites, you may recognize, come from{' '}
          <a href="https://www.spriters-resource.com/game_boy_gbc/pokemongoldsilver/">
            Pokemon Gold / Silver
          </a>
          .
        </p>
        <p>
          {`* A table is technically n-dimensional but the value of data is
          heavily skewed in favor of its edges i.e. the axes' labels. I was
          thinking more in line with a book: you in theory could pick up any
          page in a book and receive as equally valuable data as any other page
          in it.`}
        </p>
      </>
    </Slide>
  );
}

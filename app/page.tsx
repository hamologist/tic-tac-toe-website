"use client";
import Board from './game/board';
import useGameManager from './game/use-local-game-manager';

export default function Home() {
  const gameManager = useGameManager();

  return (
    <main style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: "-300px",
      marginLeft: "-300px",
      width: "600px",
      height: "600px",
    }}>
      <Board gameManager={gameManager} />
    </main>
  )
}

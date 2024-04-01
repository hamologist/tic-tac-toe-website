"use client";
import Board from '../game/board';
import useGameManager from '../game/use-local-game-manager';

export default function Home() {
  const gameManager = useGameManager();

  return (
    <main style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}>
      <Board gameManager={gameManager}/>
    </main>
  )
}

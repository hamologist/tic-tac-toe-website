import Board from './game/board';

export default function Home() {
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
      <Board />
    </main>
  )
}

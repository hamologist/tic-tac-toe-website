import Circle from './circle';
import Cross from './cross';

export type GamePieceStates = 'circle' | 'cross' | 'none';

export type BoardSquareProps = {
  state: GamePieceStates;
  top?: boolean;
  left?: boolean;
  right?: boolean;
  bottom?: boolean;
};

export default function BoardSquare(props: BoardSquareProps) {
  let gamePiece = null;
  if (props.state === 'circle') {
    gamePiece = Circle();
  } else if (props.state === 'cross') {
    gamePiece = Cross();
  }

  return (
    <div style={{
      flexGrow: 0,
      maxWidth: "33.33333%",
      flexBasis: "33.3333%",
      height: "200px",
      borderWidth: "7px",
      borderRightStyle: props.left ? 'solid' : 'none',
      borderLeftStyle: props.right ? 'solid' : 'none',
      borderTopStyle: props.bottom ? 'solid' : 'none',
      borderBottomStyle: props.top ? 'solid' : 'none',
    }}>
      <div style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {gamePiece}
      </div>
    </div>
  );
}


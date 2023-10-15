import Circle from './circle';
import Cross from './cross';
import Line from './line';
import { BoardSquareContext } from './types';

export type BoardSquareProps = {
  state: BoardSquareContext;
  top?: boolean;
  left?: boolean;
  right?: boolean;
  bottom?: boolean;
};

export default function BoardSquare({
  state: [[gamePieceState, linePieceState], clickHandler],
  ...props
}: BoardSquareProps) {
  let gamePiece = null;
  if (gamePieceState === 'circle') {
    gamePiece = Circle();
  } else if (gamePieceState === 'cross') {
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
      <div
        onClick={clickHandler}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}>
        {gamePiece}
        <Line state={linePieceState} />
      </div>
    </div>
  );
}


export type GamePieceStates = 'circle' | 'cross' | 'none';
export type LineStates = 'horizontal' | 'vertical' | '45-diagonal' | '135-diagonal' | 'none'
export type SquareState = [GamePieceStates, LineStates];
export type BoardRow = [SquareState, SquareState, SquareState];
export type BoardState = [BoardRow, BoardRow, BoardRow];
export type ValidPositionIndex = 0 | 1 | 2;

export type BoardSquareContext = [SquareState, () => void];
export type BoardSquareRowContext = [BoardSquareContext, BoardSquareContext, BoardSquareContext];
export type BoardContext = [BoardSquareRowContext, BoardSquareRowContext, BoardSquareRowContext];

export type LineContextPoint = [ValidPositionIndex, ValidPositionIndex, LineStates];
export type LineContext = [LineContextPoint, LineContextPoint, LineContextPoint];

export type CurrentPlayer = 'PlayerOne' | 'PlayerTwo';
export type GameStates = 'PlayerOneWin' | 'PlayerTwoWin' | 'Draw' | 'Playing' | 'Processing';

export type UseGameManager = {
  readonly boardState: BoardState;
  readonly currentPlayer: CurrentPlayer;
  readonly boardContext: BoardContext;
};

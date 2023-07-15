export type GamePieceStates = 'circle' | 'cross' | 'none';
export type BoardRow = [GamePieceStates, GamePieceStates, GamePieceStates];
export type BoardState = [BoardRow, BoardRow, BoardRow];

export type BoardSquareContext = [GamePieceStates, () => void];
export type BoardSquareRowContext = [BoardSquareContext, BoardSquareContext, BoardSquareContext];
export type BoardContext = [BoardSquareRowContext, BoardSquareRowContext, BoardSquareRowContext];

export type CurrentPlayer = 'PlayerOne' | 'PlayerTwo';
export type ValidPositionIndex = 0 | 1 | 2;

export type UseGameManager = {
  readonly boardState: BoardState;
  readonly currentPlayer: CurrentPlayer;
  readonly boardContext: BoardContext;
};

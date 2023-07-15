import {
  BoardContext,
  BoardState,
  BoardRow,
  ValidPositionIndex,
  BoardSquareRowContext,
  BoardSquareContext
} from './types';

export type GenerateBoardSquareClickHandler = (
  rowIndex: ValidPositionIndex,
  colIndex: ValidPositionIndex
) => BoardSquareContext[1];

function generateBoardSquareContextsRow(
  boardRow: BoardRow,
  rowIndex: ValidPositionIndex,
  handler: GenerateBoardSquareClickHandler,
) {
  return [
    [boardRow[0], handler(rowIndex, 0)],
    [boardRow[1], handler(rowIndex, 1)],
    [boardRow[2], handler(rowIndex, 2)]
  ] as BoardSquareRowContext; 
}


export default function generateBoardContext(
  boardState: BoardState,
  handler: GenerateBoardSquareClickHandler,
) {
  return [
    generateBoardSquareContextsRow(boardState[0], 0, handler),
    generateBoardSquareContextsRow(boardState[1], 1, handler),
    generateBoardSquareContextsRow(boardState[2], 2, handler),
  ] as BoardContext;
};

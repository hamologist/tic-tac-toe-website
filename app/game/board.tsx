"use client";
import React, { useState } from 'react';
import BoardSquare from './board-square';

export type GamePieceStates = 'circle' | 'cross' | 'none';
export type BoardSquareContext = [GamePieceStates, () => void];

type BoardRow = [GamePieceStates, GamePieceStates, GamePieceStates];
type BoardState = [BoardRow, BoardRow, BoardRow];

type CurrentPlayer = 'PlayerOne' | 'PlayerTwo';
type ValidPositionIndex = 0 | 1 | 2;


export default function Board() {
  const [boardState, setBoardState] = useState<BoardState>([
    ['none', 'none', 'none'],
    ['none', 'none', 'none'],
    ['none', 'none', 'none'],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayer>('PlayerOne');

  const generateBoardSquareClickHandler = (
    row: ValidPositionIndex,
    col: ValidPositionIndex,
  ) => {
    return () => {
      if (boardState[row][col] === 'none') {
        const newBoardState = [
          [...boardState[0]],
          [...boardState[1]],
          [...boardState[2]],
        ] as BoardState 
        newBoardState[row][col] = currentPlayer === 'PlayerOne' ? 'cross' : 'circle';
        setBoardState(newBoardState);

        if (currentPlayer === 'PlayerOne') {
          setCurrentPlayer('PlayerTwo');
        } else {
          setCurrentPlayer('PlayerOne');
        }
      }
    };
  }

  const generateBoardSquareContextsRow = (
    boardRow: BoardRow,
    rowIndex: ValidPositionIndex,
  ) => {
    return [
      [boardRow[0], generateBoardSquareClickHandler(rowIndex, 0)],
      [boardRow[1], generateBoardSquareClickHandler(rowIndex, 1)],
      [boardRow[2], generateBoardSquareClickHandler(rowIndex, 2)]
    ] as const
  }

  const generateBoardSquareContexts = (boardState: BoardState) => {
    return [
      generateBoardSquareContextsRow(boardState[0], 0),
      generateBoardSquareContextsRow(boardState[1], 1),
      generateBoardSquareContextsRow(boardState[2], 2),
    ] as const;
  }

  const boardSquareContexts = generateBoardSquareContexts(boardState);
  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
    }}>
      <BoardSquare state={boardSquareContexts[0][0]} top left />
      <BoardSquare state={boardSquareContexts[0][1]} top />
      <BoardSquare state={boardSquareContexts[0][2]} top right />
      <BoardSquare state={boardSquareContexts[1][0]} left />
      <BoardSquare state={boardSquareContexts[1][1]} />
      <BoardSquare state={boardSquareContexts[1][2]} right />
      <BoardSquare state={boardSquareContexts[2][0]} left bottom />
      <BoardSquare state={boardSquareContexts[2][1]} bottom />
      <BoardSquare state={boardSquareContexts[2][2]} right bottom />
    </div>
  );
}


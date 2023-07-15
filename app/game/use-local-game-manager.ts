"use client";
import { useState } from 'react';
import generateBoardContext from './board-context';
import {
  UseGameManager,
  BoardState,
  CurrentPlayer,
  ValidPositionIndex,
  BoardSquareContext,
} from './types';

export default function useLocalGameManager(): UseGameManager {
  const [boardState, setBoardState] = useState<BoardState>([
    ['none', 'none', 'none'],
    ['none', 'none', 'none'],
    ['none', 'none', 'none'],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayer>('PlayerOne');

  const generateBoardSquareClickHandler = (
    rowIndex: ValidPositionIndex,
    colIndex: ValidPositionIndex,
  ): BoardSquareContext[1] => {
    return () => {
      if (boardState[rowIndex][colIndex] === 'none') {
        const newBoardState = [
          [...boardState[0]],
          [...boardState[1]],
          [...boardState[2]],
        ] as BoardState;

        if (currentPlayer === 'PlayerOne') {
          newBoardState[rowIndex][colIndex] = 'cross';
        } else {
          newBoardState[rowIndex][colIndex] = 'circle';
        }
        setBoardState(newBoardState);

        if (currentPlayer === 'PlayerOne') {
          setCurrentPlayer('PlayerTwo');
        } else {
          setCurrentPlayer('PlayerOne');
        }
      }
    };
  };

  return {
    boardState,
    currentPlayer,
    boardContext: generateBoardContext(
      boardState,
      generateBoardSquareClickHandler,
    ),
  };
}


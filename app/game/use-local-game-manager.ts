"use client";
import { useState, useEffect } from 'react';
import generateBoardContext from './board-context';
import {
  UseGameManager,
  BoardState,
  CurrentPlayer,
  ValidPositionIndex,
  BoardSquareContext,
  GameStates,
} from './types';

export default function useLocalGameManager(): UseGameManager {
  const [boardState, setBoardState] = useState<BoardState>([
    ['none', 'none', 'none'],
    ['none', 'none', 'none'],
    ['none', 'none', 'none'],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayer>('PlayerOne');
  const [gameState, setGameState] = useState<GameStates>('Playing');

  const generateBoardSquareClickHandler = (
    rowIndex: ValidPositionIndex,
    colIndex: ValidPositionIndex,
  ): BoardSquareContext[1] => {
    return () => {
      if (gameState === 'Playing' && boardState[rowIndex][colIndex] === 'none') {
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
        setGameState('Processing');
        setBoardState(newBoardState);
      }
    };
  };

  const getWinningPlayer = () => {
    if (currentPlayer === 'PlayerOne') {
      return 'PlayerOneWin' as const;
    }

    return 'PlayerTwoWin' as const;
  }

  const checkForWin = () => {
    // Check rows
    for (const row of boardState) {
      if (row[0] !== 'none' && row[0] === row[1] && row[1] === row[2]) {
        return true;
      }
    }

    // Check cols
    for (let i = 0; i < boardState.length; i++) {
      if (
        boardState[0][i] !== 'none'
        && boardState[0][i] === boardState[1][i]
        && boardState[1][i] === boardState[2][i]
      ) {
        return true;
      }
    }

    // Check diagonals
    if (
      (
        boardState[0][0] !== 'none'
        && boardState[0][0] === boardState[1][1]
        && boardState[1][1] === boardState[2][2]
      )
      || (
        boardState[0][2] !== 'none'
        && boardState[0][2] === boardState[1][1]
        && boardState[1][1] === boardState[2][0]
      )
    ) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (gameState !== 'Processing') {
      return;
    }

    if (checkForWin()) {
      setGameState(getWinningPlayer());
      return;
    }

    if (currentPlayer === 'PlayerOne') {
      setCurrentPlayer('PlayerTwo');
    } else {
      setCurrentPlayer('PlayerOne');
    }

    setGameState('Playing');
  }, [gameState, boardState]);

  return {
    boardState,
    currentPlayer,
    boardContext: generateBoardContext(
      boardState,
      generateBoardSquareClickHandler,
    ),
  };
}


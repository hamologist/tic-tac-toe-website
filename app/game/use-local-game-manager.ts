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
  LineContext,
} from './types';

function cloneBoardState(boardState: BoardState) {
  return [
    [[...boardState[0][0]], [...boardState[0][1]], [...boardState[0][2]]],
    [[...boardState[1][0]], [...boardState[1][1]], [...boardState[1][2]]],
    [[...boardState[2][0]], [...boardState[2][1]], [...boardState[2][2]]],
  ] as BoardState;
}

export default function useLocalGameManager(): UseGameManager {
  const [boardState, setBoardState] = useState<BoardState>([
    [['none', 'none'], ['none', 'none'], ['none', 'none']],
    [['none', 'none'], ['none', 'none'], ['none', 'none']],
    [['none', 'none'], ['none', 'none'], ['none', 'none']],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayer>('PlayerOne');
  const [gameState, setGameState] = useState<GameStates>('Playing');

  const generateBoardSquareClickHandler = (
    rowIndex: ValidPositionIndex,
    colIndex: ValidPositionIndex,
  ): BoardSquareContext[1] => {
    return () => {
      if (gameState === 'Playing' && boardState[rowIndex][colIndex][0] === 'none') {
        const newBoardState = cloneBoardState(boardState);

        if (currentPlayer === 'PlayerOne') {
          newBoardState[rowIndex][colIndex] = ['cross', 'none'];
        } else {
          newBoardState[rowIndex][colIndex] = ['circle', 'none'];
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

  const findWin = (): LineContext | null => {
    // Check rows
    for (let i = 0; i < boardState.length; i++) {
      const row = boardState[i];
      if (row[0][0] !== 'none' && row[0][0] === row[1][0] && row[1][0] === row[2][0]) {
        return [[i, 0, 'horizontal'], [i, 1, 'horizontal'], [i, 2, 'horizontal']] as LineContext;
      }
    }

    // Check cols
    for (let i = 0; i < boardState.length; i++) {
      if (
        boardState[0][i][0] !== 'none'
        && boardState[0][i][0] === boardState[1][i][0]
        && boardState[1][i][0] === boardState[2][i][0]
      ) {
        return [[0, i, 'vertical'], [1, i, 'vertical'], [2, i, 'vertical']] as LineContext;
      }
    }

    // Check diagonals
    if (
      boardState[0][0][0] !== 'none'
      && boardState[0][0][0] === boardState[1][1][0]
      && boardState[1][1][0] === boardState[2][2][0]
    ) {
      return [[0, 0, '45-diagonal'], [1, 1, '45-diagonal'], [2, 2, '45-diagonal']] as LineContext;
    }
    if (
      boardState[0][2][0] !== 'none'
      && boardState[0][2][0] === boardState[1][1][0]
      && boardState[1][1][0] === boardState[2][0][0]
    ) {
      return [[0, 2, '135-diagonal'], [1, 1, '135-diagonal'], [2, 0, '135-diagonal']] as LineContext;
    }

    return null;
  };

  useEffect(() => {
    if (gameState !== 'Processing') {
      return;
    }

    const lineContextCheck = findWin();
    if (lineContextCheck !== null) {
      const newBoardState = cloneBoardState(boardState);

      for (const lineContextPoint of lineContextCheck) {
        newBoardState[lineContextPoint[0]][lineContextPoint[1]][1] = lineContextPoint[2];
      }

      setGameState(getWinningPlayer());
      setBoardState(newBoardState);
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


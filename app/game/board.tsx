"use client";
import React from 'react';
import BoardSquare from './board-square';
import { UseGameManager } from './types';

export type BoardProps = {
  gameManager: UseGameManager;
};

export default function Board({ gameManager }: BoardProps) {
  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
    }}>
      <BoardSquare state={gameManager.boardContext[0][0]} top left />
      <BoardSquare state={gameManager.boardContext[0][1]} top />
      <BoardSquare state={gameManager.boardContext[0][2]} top right />
      <BoardSquare state={gameManager.boardContext[1][0]} left />
      <BoardSquare state={gameManager.boardContext[1][1]} />
      <BoardSquare state={gameManager.boardContext[1][2]} right />
      <BoardSquare state={gameManager.boardContext[2][0]} left bottom />
      <BoardSquare state={gameManager.boardContext[2][1]} bottom />
      <BoardSquare state={gameManager.boardContext[2][2]} right bottom />
    </div>
  );
}


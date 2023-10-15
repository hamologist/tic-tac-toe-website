"use client";
import React from 'react';
import BoardSquare from './board-square';
import { UseGameManager } from './types';
import Restart from './restart';

export type BoardProps = {
  gameManager: UseGameManager;
};

export default function Board({ gameManager }: BoardProps) {
  return (
    <div style={{
        width: "600px",
    }}>
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
      <div style={{
        display: "flex",
        justifyContent: "space-evenly",
        fontWeight: "bold",
        fontSize: "1.5rem",
      }}>
        <div>
          <p>Player One (X)</p>
          <p style={{
            textAlign: "center",
            marginBottom: "0px",
          }}>
            {gameManager.playerOneScore}
          </p>
        </div>
        <div>
          <p>Player Two (O)</p>
          <p style={{
            textAlign: "center",
            marginBottom: "0px",
          }}>
            {gameManager.playerTwoScore}
          </p>
        </div>
        <div
          style={{
            width: "40px",
            height: "40px",
            position: "absolute",
            top: "100%",
            left: "100%",
            marginLeft: "-40px",
            marginTop: "-40px",
            cursor: "pointer",
          }}
          onClick={() => { gameManager.newGame(); }}
        >
          <Restart />
        </div>
      </div>
      {!gameManager.isPlaying() &&
        <div
          style={{
            position: 'absolute',
            width: "100%",
            height: "600px",
            top: "0",
            cursor: "pointer",
          }}
          onClick={() => { gameManager.newGame(); }}
        />}
    </div>
  );
}


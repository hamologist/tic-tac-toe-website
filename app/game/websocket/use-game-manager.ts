"use client";

import { useEffect, useState } from "react";
import { BoardSquareContext, BoardState, GameStates, Players, ValidPositionIndex } from "../types";
import generateBoardContext from "../board-context";
import * as Schemas from "./schemas";

type User = {
  id: string;
  displayName: string;
  secret: string | null;
}

function cloneBoardState(boardState: BoardState) {
  return [
    [[...boardState[0][0]], [...boardState[0][1]], [...boardState[0][2]]],
    [[...boardState[1][0]], [...boardState[1][1]], [...boardState[1][2]]],
    [[...boardState[2][0]], [...boardState[2][1]], [...boardState[2][2]]],
  ] as BoardState;
}

export default function useGameManager() {
  const [boardState, setBoardState] = useState<BoardState>([
    [['none', 'none'], ['none', 'none'], ['none', 'none']],
    [['none', 'none'], ['none', 'none'], ['none', 'none']],
    [['none', 'none'], ['none', 'none'], ['none', 'none']],
  ]);
  const [gameState, setGameState] = useState<GameStates>('Playing');
  const [startingPlayer, setStartingPlayer] = useState<Players>('PlayerOne');
  const [currentPlayer, setCurrentPlayer] = useState<Players>('PlayerOne');
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [moveCount, setMoveCount] = useState(0);
  const [webSocket, setWebSocket] = useState<WebSocket>(new WebSocket(process.env.NEXT_PUBLIC_GAME_BACKEND_URL!));
  const [user, setUser] = useState<User | null>(null);
  const [otherPlayer, setOtherPlayer] = useState<User | null>(null);
  const [currentGameId, setCurrentGameId] = useState<string | null>(null);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    setReady(false);
    webSocket.onopen = () => {
      webSocket.onmessage = handleMessage;
      setReady(true);
    }
  }, [webSocket])

  useEffect(() => {
    if (webSocket === null) {
      return;
    }

    //webSocket.send(JSON.stringify({
    //  action:"getTicTacToe",
    //  payload: {
    //      id: "fc18892a-6879-4ee5-86ca-812a537d4d54"
    //  },
    //}));
  }, [currentGameId])

  const createNewPlayer = (username: string) => {
    webSocket.send(JSON.stringify({
      action:"createPlayer",
      payload: {
          username,
      }
    }));
  };

  const handleMessage = (ev: MessageEvent<any>) => {
    let parsed: any;
    try {
      parsed = JSON.parse(ev.data);
    } catch (err) {
      console.error("Failed to parse message", ev.data);
    }

    if (parsed?.action === "getTicTacToe") {
      handleGetTicTacToeMessage(Schemas.getTicTacToeSchema.parse(parsed));
    } else {
      console.log(parsed);
    }
  };

  const handleGetTicTacToeMessage = (payload: Schemas.GetTicTacToeMessage) => {
    console.log(payload);
  };

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
        setMoveCount((prevState) => prevState + 1);
      }
    };
  };

  const newGame = () => {};

  const isPlaying = () => { return true; }

  return {
    boardState,
    gameState,
    startingPlayer,
    currentPlayer,
    playerOneScore,
    playerTwoScore,
    user,
    otherPlayer,
    currentGameId,
    boardContext: generateBoardContext(
      boardState,
      generateBoardSquareClickHandler,
    ),
    createNewPlayer,
    newGame,
    isPlaying,
  }
}

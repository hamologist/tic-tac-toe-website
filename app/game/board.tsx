import React from 'react';
import BoardSquare from './board-square';

export default function Board() {
  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
    }}>
      <BoardSquare state="cross" top left />
      <BoardSquare state="circle" top />
      <BoardSquare state="none" top right />
      <BoardSquare state="none" left />
      <BoardSquare state="none" />
      <BoardSquare state="none" right />
      <BoardSquare state="none" left bottom />
      <BoardSquare state="none" bottom />
      <BoardSquare state="none" right bottom />
    </div>
  );
}


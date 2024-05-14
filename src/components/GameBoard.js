// src/components/GameBoard.js
import React from 'react';

import { useGameState } from '../hooks/useGameState';
import './GameBoard.css';
import GameCell from './GameCell';

const GameBoard = () => {
  const { gameState, placeGoat, movePiece } = useGameState();

  return (
    <div className="game-board">
      <div className="row">
        <div className="col-sm">
          {gameState.turn === 'tiger' ? '🐅' : '🐐'}'s turn
        </div>
      </div>
      <div className='row'>
      <div className="col-md-3 game-row">
        {gameState.board.map((row, rowIndex) => (
          <div className="game-cell-row" key={rowIndex}>
            {row.map((cell, colIndex) => (
              <GameCell
                key={colIndex}
                row={rowIndex}
                col={colIndex}
                piece={cell}
                movePiece={movePiece}
                placeGoat={placeGoat}
                gameState={gameState}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="col-md-4 offset-md-4 game-info">
        <p>Goats to Place: {gameState.goatsToPlace}</p>
        <p>Goats Captured: {gameState.goatsCaptured}</p>
      </div>
    </div>
    </div>
  );
};

export default GameBoard;

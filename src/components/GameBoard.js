// src/components/GameBoard.js
import React from 'react';
import { useParams } from 'react-router-dom';

import './GameBoard.css';
import GameCell from './GameCell';
import { useGameState } from '../hooks/useGameState';
import ClipLoader from 'react-spinners/ClipLoader';

const GameBoard = () => {

  const { gameId } = useParams();
  const { gameState, placeGoat, movePiece, loading } = useGameState(gameId);

  const shareLink = window.location.href;



  return (
    <div className={`game-container ${loading ? 'loading' : ''}`}>
      {loading && <div className="loading-overlay">
        <ClipLoader color={"#ffffff"} loading={loading} size={150} />
      </div>}
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
        <p><a href={shareLink} target="_blank" rel="noopener noreferrer">Share this game</a></p>

      </div>
    </div>
    </div>
    </div>
  );
};

export default GameBoard;

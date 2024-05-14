// src/components/GameCell.js
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../constants';
import './GameCell.css';

const GameCell = ({ row, col, piece, movePiece, placeGoat, gameState }) => {
  const [{ isOver }, drop] = useDrop({
    accept: [ItemTypes.TIGER, ItemTypes.GOAT],
    drop: (item) => movePiece(item.row, item.col, row, col),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{ isDragging }, drag] = useDrag({
    type: piece === 'T' ? ItemTypes.TIGER : ItemTypes.GOAT,
    item: { type: piece === 'T' ? ItemTypes.TIGER : ItemTypes.GOAT, row, col },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    canDrag: piece === 'T' || (piece === 'G' && gameState.goatsToPlace === 0),
  });

  return (
    <div
      ref={drop}
      className={`shadow-sm cell ${isOver ? 'hover' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={() => placeGoat(row, col)}
    >
      {piece === 'T' ? (
        <div ref={drag} className="piece">
          🐅
        </div>
      ) : piece === 'G' ? (
        <div ref={drag} className="piece">🐐</div>
      ) : null}
    </div>
  );
};

export default GameCell;

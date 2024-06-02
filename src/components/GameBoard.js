import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import './GameBoard.css';
import GameCell from './GameCell';
import { useGameState } from '../hooks/useGameState';

const GameBoard = () => {
  const { gameId } = useParams();
  const { gameState, placeGoat, movePiece, loading } = useGameState(gameId);

  const shareLink = window.location.href;

  return (
    <Container className={`game-container ${loading ? 'loading' : ''} mt-5`}>
      {loading && (
        <div className="loading-overlay d-flex justify-content-center align-items-center">
          <Spinner animation="border" variant="primary" size="lg" />
        </div>
      )}
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">
                {gameState.turn === 'tiger' ? '🐅' : '🐐'}'s turn
              </Card.Title>
              <Row>
                <Col md={8}>
                  <div className="game-board">
                    {gameState.board.map((row, rowIndex) => (
                      <div className="game-cell-row d-flex" key={rowIndex}>
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
                </Col>
                <Col md={4} className="game-info">
                  <Card>
                    <Card.Body>
                      <Card.Text>Goats to Place: {gameState.goatsToPlace}</Card.Text>
                      <Card.Text>Goats Captured: {gameState.goatsCaptured}</Card.Text>
                      <Button
                        variant="primary"
                        href={shareLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2"
                      >
                        Share this game
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default GameBoard;

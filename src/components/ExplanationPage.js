import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';

const ExplanationPage = () => {
  const navigate = useNavigate();

  const startNewGame = () => {
    navigate('/new');
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title as="h1" className="text-center">Tiger and Goat (Bagh Chal)</Card.Title>
              <Card.Text>
                Bagh Chal, which means "Moving Tigers," is a strategic board game originating from Nepal. It is a game of hunting played between two players on a grid of 5×5 points. One player controls four tigers, and the other player controls up to 20 goats. The goal of the tigers is to capture five goats, while the goats aim to trap all four tigers so they cannot move.
              </Card.Text>
              <Card.Subtitle as="h2" className="mt-4">How to Play:</Card.Subtitle>
              <ul>
                <li>The game starts with four tigers placed on four corners of the board.</li>
                <li>Goats are placed one by one, trying to block the tigers' moves.</li>
                <li>Tigers can move to adjacent points along the lines or capture goats by jumping over them.</li>
                <li>Goats can only move to adjacent points along the lines once all 20 goats are placed.</li>
                <li>The game continues until tigers capture five goats or goats trap all tigers.</li>
              </ul>
              <div className="text-center mt-4">
                <Button variant="primary" onClick={startNewGame}>Start New Game</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ExplanationPage;

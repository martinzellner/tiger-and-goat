// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import GameBoard from './components/GameBoard';
import './App.css';

const generateGameId = () => {
  return Math.random().toString(36).substring(2, 15);
};

const RedirectToNewGame = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const newGameId = generateGameId();
    
    navigate(`/${newGameId}`);
  }, [navigate]);
  return null;
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/:gameId" element={<GameBoard />} />
          <Route path="/" element={<RedirectToNewGame />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

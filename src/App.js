import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import GameBoard from './components/GameBoard';
import ExplanationPage from './components/ExplanationPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
          <Route path="/new" element={<RedirectToNewGame />} />
          <Route path="/" element={<ExplanationPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

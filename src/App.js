// src/App.js
import React from 'react';
import GameBoard from './components/GameBoard';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {
  return (
    <div className="container">
      <h1>Tiger and Goat</h1>
      <GameBoard />
    </div>
  );
}

export default App;

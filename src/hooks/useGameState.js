// src/hooks/useGameState.js
import { useState, useEffect } from 'react';
import { initialBoardState, isValidMove, isTigerSurrounded } from '../constants';
import { db } from '../firebaseConfig';
import { ref, set, get, onValue } from "firebase/database";
import { flattenBoard, unflattenBoard } from '../utils/arrayUtils';


export const useGameState = (gameId) => {
  const [gameState, setGameState] = useState(initialBoardState);
  const [winner, setWinner] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkWinner = () => {
      if (gameState.goatsToPlace === 0 && gameState.goatsCaptured < 20) {
        if (isTigerSurrounded(gameState.board)) {
          setWinner('goat');
        }
      } else if (gameState.goatsCaptured === 20) {
        setWinner('tiger');
      }
    };

    checkWinner();
  }, [gameState]);

  const saveGameState = async (state) => {
    if (loading) {
      return;
    }
    const { board, ...rest } = state;
    try {
      const gameRef = ref(db, gameId);
      await set(gameRef, { board: flattenBoard(board), ...rest });
    } catch (e) {
      console.error('Error saving document: ', e);
    }
  };

  const loadGameState = async () => {
    try {
      const gameRef = ref(db, gameId);
      const docSnap = await get(gameRef);

      if (docSnap.exists()) {
        console.log("Game exists, loading state.")
        const data = docSnap.val();
        const { board, ...rest } = data;
        setGameState({ board: unflattenBoard(board), ...rest });
        setLoading(false);

      } else {
        console.log('No such game!');
        // Initialize a new game in Firestore
        await saveGameState(gameState);
        setLoading(false);
      }
    } catch (e) {
      console.error('Error loading document: ', e);
    }
  };

  useEffect(() => {
    if (gameId) {
      loadGameState();
    }
  }, [gameId]);

  useEffect(() => {
    saveGameState(gameState);
    
  }, [gameState]);

  useEffect(() => {
    if (gameId) {
      const gameRef = ref(db, gameId);

      const unsubscribe = onValue(gameRef, (snapshot) => {
        
        if (snapshot.exists()) {
          setLoading(true);
          const data = snapshot.val();
          const board = unflattenBoard(data.board);
          setGameState({ ...data, board });
          setLoading(false);
        }
      });

      return () => unsubscribe();
    }
  }, [gameId]);


  const placeGoat = (row, col) => {
    if (gameState.turn === 'goat' && gameState.goatsToPlace > 0 && gameState.board[row][col] === null) {
      const newBoard = gameState.board.map((r, rowIndex) =>
        r.map((c, colIndex) => (rowIndex === row && colIndex === col ? 'G' : c))
      );
      setGameState({
        ...gameState,
        board: newBoard,
        turn: 'tiger',
        goatsToPlace: gameState.goatsToPlace - 1,
      });
    }
  };

  const movePiece = (fromRow, fromCol, toRow, toCol) => {
    const piece = gameState.board[fromRow][fromCol];
    if (gameState.turn === 'tiger' && piece === 'T') {
      if (isValidMove(gameState.board, fromRow, fromCol, toRow, toCol, 'T')) {
        let newBoard = gameState.board.map((r, rowIndex) =>
          r.map((c, colIndex) => {
            if (rowIndex === fromRow && colIndex === fromCol) return null;
            if (rowIndex === toRow && colIndex === toCol) return 'T';
            return c;
          })
        );

        let goatsCaptured = gameState.goatsCaptured;
        if (Math.abs(fromRow - toRow) === 2 || Math.abs(fromCol - toCol) === 2) {
          const middleRow = (fromRow + toRow) / 2;
          const middleCol = (fromCol + toCol) / 2;
          newBoard = newBoard.map((r, rowIndex) =>
            r.map((c, colIndex) => (rowIndex === middleRow && colIndex === middleCol ? null : c))
          );
          goatsCaptured++;
        }

        setGameState({
          ...gameState,
          board: newBoard,
          turn: 'goat',
          goatsCaptured: goatsCaptured,
        });
      }
    } else if (gameState.turn === 'goat' && piece === 'G' && gameState.goatsToPlace === 0) {
      if (isValidMove(gameState.board, fromRow, fromCol, toRow, toCol, 'G')) {
        const newBoard = gameState.board.map((r, rowIndex) =>
          r.map((c, colIndex) => {
            if (rowIndex === fromRow && colIndex === fromCol) return null;
            if (rowIndex === toRow && colIndex === toCol) return 'G';
            return c;
          })
        );
        setGameState({
          ...gameState,
          board: newBoard,
          turn: 'tiger',
        });
      }
    }
  };

  return { gameState, placeGoat, movePiece, saveGameState, loading };
};

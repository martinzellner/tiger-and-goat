// src/hooks/useGameState.test.js
import { renderHook } from '@testing-library/react'
import { act } from 'react';
import { useGameState } from './useGameState';

describe('Game Logic', () => {
  it('should place goat on an empty cell', () => {
    const { result } = renderHook(() => useGameState());
    const { placeGoat, gameState } = result.current;

    act(() => {
      placeGoat(1, 1); // Place goat on an empty cell
    });

    expect(gameState.board[1][1]).toBe('G');
  });

  it('should not place goat on an occupied cell', () => {
    const { result } = renderHook(() => useGameState());
    const { placeGoat, gameState } = result.current;

    // Place goat on an occupied cell
    act(() => {
      placeGoat(0, 0); // Initial board has a tiger in this cell
    });

    expect(gameState.board[0][0]).toBe('T'); // Verify that tiger is still present
  });

  // Add more test cases...
});

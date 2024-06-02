export const initialBoardState = {
    board: [
      ['T', null, null, null, 'T'],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      ['T', null, null, null, 'T'],
    ],
    turn: 'goat',
    goatsToPlace: 20,
    goatsCaptured: 0,
  };
  
  export const ItemTypes = {
    TIGER: 'tiger',
    GOAT: 'goat',
  };
  
  export const isValidMove = (board, fromRow, fromCol, toRow, toCol, piece) => {
    const rowDiff = Math.abs(fromRow - toRow);
    const colDiff = Math.abs(fromCol - toCol);
  
    if (piece === 'T') {
      // Check for adjacent move
      if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1) || (rowDiff === 1 && colDiff === 1)) {
        return board[toRow][toCol] === null;
      }
  
      // Check for capturing move
      if ((rowDiff === 2 && colDiff === 0) || (rowDiff === 0 && colDiff === 2) || (rowDiff === 2 && colDiff === 2)) {
        const middleRow = (fromRow + toRow) / 2;
        const middleCol = (fromCol + toCol) / 2;
        return board[toRow][toCol] === null && board[middleRow][middleCol] === 'G';
      }
    } else if (piece === 'G') {
      // Check for adjacent move for goat
      return (
        ((rowDiff === 1 && colDiff === 0) ||
          (rowDiff === 0 && colDiff === 1) ||
          (rowDiff === 1 && colDiff === 1)) &&
        board[toRow][toCol] === null
      );
    }
  
    return false;
  };
  
  export const isTigerSurrounded = (board) => {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === 'T') {
          // Check if any adjacent cell is empty
          if (
            (row > 0 && board[row - 1][col] === null) ||
            (row < board.length - 1 && board[row + 1][col] === null) ||
            (col > 0 && board[row][col - 1] === null) ||
            (col < board[row].length - 1 && board[row][col + 1] === null)
          ) {
            return false; // At least one available move for the tiger
          }
        }
      }
    }
    return true; // No available move for any tiger
  };
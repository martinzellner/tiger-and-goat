// src/utils/arrayUtils.js
export const flattenBoard = (board) => {
    return board.reduce((acc, row) => [...acc, ...row], []);
};

export const unflattenBoard = (flatBoard, size = 5) => {
    const board = Array(size).fill(null).map(() => Array(size).fill(null)); // Create a 5x5 board with null values

    Object.keys(flatBoard).forEach(key => {
      const index = parseInt(key, 10); // Convert the key to an integer
      const row = Math.floor(index / size); // Calculate the row index
      const col = index % size; // Calculate the column index
      board[row][col] = flatBoard[key]; // Place the value in the board
    });
    return board;
};

// 执行用时为 132 ms 的范例
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
  let row = new Array(9);
  let col = new Array(9);
  let grid = new Array(9);
  for (let i = 0; i < 9; i++) {
    row[i] = new Array(9);
    col[i] = new Array(9);
    grid[i] = new Array(9);
  }
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === ".") continue;
      let index = ((i / 3) | 0) * 3 + ((j / 3) | 0);
      let num = board[i][j] - "0";
      if (row[i][num] || col[j][num] || grid[index][num]) return false;
      else {
        row[i][num] = true;
        col[j][num] = true;
        grid[index][num] = true;
      }
    }
  }
  return true;
};

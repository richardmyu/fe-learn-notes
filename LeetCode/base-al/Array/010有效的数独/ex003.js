// 执行用时为 116 ms 的范例
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
  for (let i = 0; i < 9; i++) {
    const obj = {},
      obj2 = {};
    for (let j = 0; j < 9; j++) {
      if (obj.hasOwnProperty(board[i][j])) {
        return false;
      }
      if (obj2.hasOwnProperty(board[j][i])) {
        return false;
      }
      if (board[i][j] !== ".") {
        obj[board[i][j]] = true;
      }

      if (board[j][i] !== ".") {
        obj2[board[j][i]] = true;
      }
    }
  }
  for (let i = 0; i < 3; i++) {
    let row = i * 3;
    for (let j = 0; j < 3; j++) {
      let col = j * 3;
      let obj = {};
      for (let m = row; m <= row + 2; m++) {
        for (let n = col; n <= col + 2; n++) {
          if (obj.hasOwnProperty(board[m][n])) {
            return false;
          }
          if (board[m][n] !== ".") {
            obj[board[m][n]] = true;
          }
        }
      }
    }
  }
  return true;
};

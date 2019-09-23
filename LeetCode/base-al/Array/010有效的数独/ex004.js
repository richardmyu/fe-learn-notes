// 执行用时为 120 ms 的范例
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    for (let j = 0; j < board.length; j++) {
      const v = row[j];
      if (v !== ".") {
        for (let k = 0; k < board.length; k++) {
          if (row[k] === v && k !== j) {
            return false;
          }
          if (board[k][j] === v && k !== i) {
            return false;
          }
          const blockRowStart = Math.floor(i / 3) * 3;
          const blockRowEnd = blockRowStart + 2;
          const blockColStart = Math.floor(j / 3) * 3;
          const blockColEnd = blockColStart + 2;
          for (let m = blockRowStart; m <= blockRowEnd; m++) {
            for (let n = blockColStart; n <= blockColEnd; n++) {
              if (board[m][n] === v && !(m === i && n === j)) {
                return false;
              }
            }
          }
        }
      }
    }
  }
  return true;
};

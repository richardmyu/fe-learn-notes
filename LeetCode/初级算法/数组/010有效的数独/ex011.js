// 执行用时为 148 ms 的范例
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
  let ver = {};
  let chunk = [[{}, {}, {}], [{}, {}, {}], [{}, {}, {}]];
  let bo = true;
  for (let i = 0; i < board.length; i++) {
    let rows = {};
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] !== ".") {
        if (!ver[j]) {
          ver[j] = {};
        }
        let iNum = i === 0 ? Math.floor(i / 3) : Math.floor((i + 1) / 3 - 0.2);
        let jNum = j === 0 ? Math.floor(j / 3) : Math.floor((j + 1) / 3 - 0.2);
        if (chunk[iNum][jNum][board[i][j]]) {
          return (bo = false);
        }
        if (rows[board[i][j]]) {
          return (bo = false);
        }
        if (ver[j][board[i][j]]) {
          return (bo = false);
        }
        rows[board[i][j]] = [i, j];
        ver[j][board[i][j]] = [i, j];
        chunk[iNum][jNum][board[i][j]] = [i, j];
      }
    }
  }
  return bo;
};

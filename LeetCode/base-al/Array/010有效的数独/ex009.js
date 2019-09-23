// 执行用时为 140 ms 的范例
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
  let mapRow = new Set();
  let mapColumn = new Set();
  let mapBorder = new Set();
  for (let i = 0; i < 9; i++) {
    // 判断当前每行
    for (let j = 0; j < 9; j++) {
      if (board[i][j] !== ".") {
        if (mapRow.has(board[i][j])) {
          return false;
        } else {
          mapRow.add(board[i][j]);
        }
      }
      if (board[j][i] !== ".") {
        if (mapColumn.has(board[j][i])) {
          return false;
        } else {
          mapColumn.add(board[j][i]);
        }
      }
    }
    mapRow.clear();
    mapColumn.clear();
  }
  // 判断当前 3x3 格子
  let arr = [0, 3, 6];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let x1 = arr[i]; x1 < arr[i] + 3; x1++) {
        for (let y1 = arr[j]; y1 < arr[j] + 3; y1++) {
          if (board[x1][y1] !== ".") {
            if (mapBorder.has(board[x1][y1])) {
              return false;
            } else {
              mapBorder.add(board[x1][y1]);
            }
          }
        }
      }
      mapBorder.clear();
    }
  }
  return true;
};

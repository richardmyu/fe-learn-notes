// 执行用时为 136 ms 的范例
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
  // 行检查
  for (let arr of board) {
    let row = [];
    for (let i = 0; i < 9; i++) {
      if (arr[i] !== ".") {
        row.push(arr[i]);
      }
    }
    let set = new Set(row);
    if (set.size !== row.length) return false;
  }

  // 列检查
  for (let i = 0; i < 9; i++) {
    let col = [];
    board.map(arr => {
      if (arr[i] !== ".") {
        col.push(arr[i]);
      }
    });
    let set = new Set(col);
    if (set.size !== col.length) return false;
  }

  // 方块检查
  for (let x = 0; x < 9; x += 3) {
    for (let y = 0; y < 9; y += 3) {
      let box = [];
      for (let a = x; a < 3 + x; a++) {
        for (let b = y; b < 3 + y; b++) {
          if (board[a][b] !== ".") box.push(board[a][b]);
        }
      }
      let set = new Set(box);
      if (set.size !== box.length) return false;
    }
  }

  return true;
};

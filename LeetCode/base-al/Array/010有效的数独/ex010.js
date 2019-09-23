// 执行用时为 144 ms 的范例
var isValidSudoku = function(board) {
  const rowMap = new Array(9).fill(1).map(() => ({}));
  const columnMap = new Array(9).fill(1).map(() => ({}));
  const boxMap = new Array(9).fill(1).map(() => ({}));

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const element = board[i][j];
      if (element === ".") continue;
      const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
      if (
        rowMap[i][element] ||
        columnMap[j][element] ||
        boxMap[boxIndex][element]
      ) {
        return false;
      }
      rowMap[i][element] = true;
      columnMap[j][element] = true;
      boxMap[boxIndex][element] = true;
    }
  }

  return true;
};

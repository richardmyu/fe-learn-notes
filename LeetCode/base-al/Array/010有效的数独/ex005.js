// 执行用时为 124 ms 的范例
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
  for (let i = 0; i < 9; i++) {
    let arrRow = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let arrCol = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let arrCube = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let j = 0; j < 9; j++) {
      //判断行是否重复出现
      if (board[i][j] !== ".") {
        if (arrRow[board[i][j] - 1] === 1) {
          return false;
        } else {
          arrRow[board[i][j] - 1] = 1;
        }
      }

      //判断列是否重复出现
      if (board[j][i] !== ".") {
        if (arrCol[board[j][i] - 1] === 1) {
          return false;
        } else {
          arrCol[board[j][i] - 1] = 1;
        }
      }

      //判断宫是否重复出现
      let cubeX = 3 * Math.floor(i / 3) + Math.floor(j / 3);
      let cubeY = 3 * (i % 3) + (j % 3);
      if (board[cubeX][cubeY] !== ".") {
        if (arrCube[board[cubeX][cubeY] - 1] === 1) {
          return false;
        } else {
          arrCube[board[cubeX][cubeY] - 1] = 1;
        }
      }
    }
  }
  return true;
};

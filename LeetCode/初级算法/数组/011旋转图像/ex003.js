// 执行用时为 72 ms 的范例
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
function swap(matrix, len, x, y) {
  var temp = matrix[x][y];
  matrix[x][y] = matrix[len - 1 - y][x];
  matrix[len - 1 - y][x] = matrix[len - 1 - x][len - 1 - y];
  matrix[len - 1 - x][len - 1 - y] = matrix[y][len - 1 - x];
  matrix[y][len - 1 - x] = temp;
}

var rotate = function(matrix) {
  var i, j;
  var len = matrix.length;
  for (i = 0; i < len - 1; i++) {
    for (j = i; i + j < len - 1; j++) {
      swap(matrix, len, i, j);
    }
  }
};

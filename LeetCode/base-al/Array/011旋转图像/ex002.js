// 执行用时为 68 ms 的范例
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */

var rotate = function(matrix) {
  var i, j, temp;
  var len = matrix.length;
  for (i = 0; i < len - 1; i++) {
    for (j = i; i + j < len - 1; j++) {
      temp = matrix[i][j];
      matrix[i][j] = matrix[len - 1 - j][i];
      matrix[len - 1 - j][i] = matrix[len - 1 - i][len - 1 - j];
      matrix[len - 1 - i][len - 1 - j] = matrix[j][len - 1 - i];
      matrix[j][len - 1 - i] = temp;
    }
  }
};

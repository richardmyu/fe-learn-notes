// 执行用时为 108 ms 的范例
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
  // 先对角线交换，再上下交换
  let N = matrix.length;
  for (let i = 0; i < N - 1; i++) {
    for (let j = 0; j < N - i - 1; j++) {
      [matrix[i][j], matrix[N - 1 - j][N - 1 - i]] = [
        matrix[N - 1 - j][N - 1 - i],
        matrix[i][j]
      ];
    }
  }
  // 上下交换
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < parseInt(N / 2, 10); j++) {
      [matrix[j][i], matrix[N - 1 - j][i]] = [
        matrix[N - 1 - j][i],
        matrix[j][i]
      ];
    }
  }
};

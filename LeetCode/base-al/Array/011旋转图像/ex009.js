// 执行用时为 104 ms 的范例
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(arr) {
  // 行数
  let m = arr.length;
  // 列数
  let n = arr[0].length;
  let temp;
  for (let i = 0; i < Math.floor(m / 2); i++) {
    for (let j = 0; j < n; j++) {
      temp = arr[i][j];
      arr[i][j] = arr[n - 1 - i][j];
      arr[n - 1 - i][j] = temp;
    }
  }
  for (let p = 0; p < m - 1; p++) {
    for (let q = p + 1; q < n; q++) {
      temp = arr[p][q];
      arr[p][q] = arr[q][p];
      arr[q][p] = temp;
    }
  }
  return arr;
};

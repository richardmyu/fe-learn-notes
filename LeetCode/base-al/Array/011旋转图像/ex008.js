// 执行用时为 100 ms 的范例
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
  //传入一个矩阵
  //原地 旋转 不创建新的空间 不删除已有的数据
  //那么只能是 交换
  // 1.中间轴对称交换  2.中间轴（对角线）对称交换 over
  let len = matrix.length;
  let matrixLen = Math.floor(matrix.length / 2);
  for (let i = 0; i < matrixLen; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      [matrix[i][j], matrix[len - i - 1][j]] = [
        matrix[len - i - 1][j],
        matrix[i][j]
      ];
    }
  }
  //对角线换
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < i; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  return matrix;
};

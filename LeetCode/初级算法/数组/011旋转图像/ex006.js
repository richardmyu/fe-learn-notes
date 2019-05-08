// 执行用时为 92 ms 的范例
/*
 * @lc app=leetcode.cn id=48 lang=javascript
 *
 * [48] 旋转图像
 */
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const rotate = function(matrix) {
  recursiveSwap(matrix, 0, matrix.length - 1);
};

const recursiveSwap = (matrix, start, end) => {
  if (end <= start) {
    return;
  }
  for (let i = 0; i < end - start; i++) {
    let temp = matrix[start + i][end];
    matrix[start + i][end] = matrix[start][start + i];
    const next = matrix[end][end - i];
    matrix[end][end - i] = temp;
    temp = matrix[end - i][start];
    matrix[end - i][start] = next;
    matrix[start][start + i] = temp;
  }
  recursiveSwap(matrix, start + 1, end - 1);
};

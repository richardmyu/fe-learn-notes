// 执行用时为 84 ms 的范例
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
  const n = matrix[0].length;
  const temp = [];
  matrix.forEach((item, index) => {
    if (index === 0) {
      item.forEach(value => {
        temp.push([value]);
      });
    } else {
      item.forEach((value, index2) => {
        temp[index2].unshift(value);
      });
    }
  });
  for (let i = 0; i < n; i++) {
    matrix.pop();
    matrix.unshift(temp[n - i - 1]);
  }
  return matrix;
};

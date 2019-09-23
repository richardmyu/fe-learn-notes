// 执行用时为 112 ms 的范例
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */

var rotate = function(matrix) {
  var replace = function(postion1, postion2) {
    let [x1, y1] = postion1;
    let [x2, y2] = postion2;
    [matrix[x1][y1], matrix[x2][y2]] = [matrix[x2][y2], matrix[x1][y1]];
  };
  let n = matrix.length;
  let stack = [];

  for (let z = 2 - n; z <= n - 2; z++) {
    stack = [];
    for (let x = 0; x < n; x++) {
      let y = x + z;
      if (y > n - 1 || x > n - 1 || x < 0 || y < 0) continue;
      stack.push([x, y]);
    }

    while (stack.length > 1) {
      let [head, tail] = [stack.shift(), stack.pop()];
      replace(head, tail);
    }
  }
  matrix.reverse();
};

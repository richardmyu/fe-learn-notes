// 执行用时为 128 ms 的范例
var isValidSudoku = function(board) {
  var rowMat = board;
  var colMat = [[], [], [], [], [], [], [], [], []];
  var cubeMat = [[], [], [], [], [], [], [], [], []];
  board.forEach(function(v1, i1) {
    v1.forEach(function(v2, i2) {
      colMat[i2][i1] = v2;
      var r = i1 - (i1 % 3) + Math.floor(i2 / 3);
      var c = (i1 % 3) * 3 + i2 - Math.floor(i2 / 3) * 3;
      cubeMat[r][c] = v2;
    });
  });
  var all = rowMat.concat(colMat, cubeMat);
  return all.every(function(v) {
    return checkArr(v);
  });
};

function checkArr(arr) {
  var tmp = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == ".") continue;
    if (tmp[arr[i]]) return false;
    tmp[arr[i]] = true;
  }
  return true;
}

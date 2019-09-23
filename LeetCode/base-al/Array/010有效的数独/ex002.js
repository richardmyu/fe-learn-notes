// 执行用时为 112 ms 的范例
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
  for (var i = 0; i < 9; i++) {
    pool = new Set();
    all = [];
    for (var j = 0; j < 9; j++) {
      var tmp = board[i][j];
      if (tmp != ".") {
        pool.add(tmp);
        all.push(tmp);
      }
    }
    var vcheck = pool.size == all.length;
    if (vcheck == false) return false;
  }
  for (var j = 0; j < 9; j++) {
    pool = new Set();
    all = [];
    for (var i = 0; i < 9; i++) {
      var tmp = board[i][j];
      if (tmp != ".") {
        pool.add(tmp);
        all.push(tmp);
      }
    }
    var hcheck = pool.size == all.length;
    if (hcheck == false) return false;
  }

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      pool = new Set();
      all = [];
      for (var m = 0; m < 3; m++) {
        for (var n = 0; n < 3; n++) {
          var tmp = board[3 * i + m][3 * j + n];
          if (tmp != ".") {
            pool.add(tmp);
            all.push(tmp);
          }
        }
      }
      var dcheck = pool.size == all.length;
      if (dcheck == false) return false;
    }
  }
  return true;
};

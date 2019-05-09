// 执行用时为 104 ms 的范例
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
  var columns = [{}, {}, {}, {}, {}, {}, {}, {}, {}],
    rows = [{}, {}, {}, {}, {}, {}, {}, {}, {}],
    boxs = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      var item = board[i][j];

      if (item != ".") {
        var box_index = Math.floor(i / 3) * 3 + Math.floor(j / 3);

        rows[i][item] = rows[i][item] ? (rows[i][item] += 1) : 1;
        columns[j][item] = columns[j][item] ? (columns[j][item] += 1) : 1;
        boxs[box_index][item] = boxs[box_index][item]
          ? (boxs[box_index][item] += 1)
          : 1;

        if (
          rows[i][item] > 1 ||
          columns[j][item] > 1 ||
          boxs[box_index][item] > 1
        ) {
          return false;
        }
      }
    }
  }
  return true;
};

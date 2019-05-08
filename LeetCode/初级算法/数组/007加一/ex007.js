// 执行用时为 92 ms 的范例
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
  var arr = digits.slice();
  var i = digits.length - 1;
  var add = function() {
    if (digits[i] == 9) {
      arr[i] = 0;
      i--;
      if (i == -1) {
        arr.unshift(1);
      }
      return add();
    } else {
      arr[i] = arr[i] + 1;
    }
  };
  add();
  return arr;
};

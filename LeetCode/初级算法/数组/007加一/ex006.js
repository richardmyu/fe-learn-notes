// 执行用时为 84 ms 的范例
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
  var up1 = 1;
  var arr = [];
  for (var i = digits.length - 1; i >= 0; i--) {
    digits[i] += up1;
    up1 = digits[i] > 9 ? 1 : 0;
    if (up1) {
      digits[i] = 0;
    }
    arr.unshift(digits[i]);
    if (up1 && i == 0) {
      arr.unshift(1);
    }
  }
  return arr;
};

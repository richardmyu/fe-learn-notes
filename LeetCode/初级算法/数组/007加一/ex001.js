// 执行用时为 56 ms 的范例
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
  let num = 1,
    i = digits.length;
  while (i) {
    i--;
    if (digits[i] === 9) {
      digits[i] = 0;
      num = 1;
    } else {
      digits[i] += num;
      num = 0;
      break;
    }
  }
  if (!i && num) digits.unshift(1);
  return digits;
};

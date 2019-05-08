// 执行用时为 64 ms 的范例
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
  let { length } = digits;
  let pre = 1;
  let curr;
  while (length-- > 0) {
    curr = digits[length];
    curr += pre;
    if (curr < 10) {
      digits[length] = curr;
      break;
    }
    if (curr === 10) {
      pre = 1;
      digits[length] = 0;
      if (length === 0) {
        digits.unshift(1);
      }
    }
  }
  return digits;
};

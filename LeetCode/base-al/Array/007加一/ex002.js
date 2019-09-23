// 执行用时为 60 ms 的范例
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
  let len = digits.length - 1;
  do {
    if (digits[len] < 9) {
      digits[len]++;
      return digits;
    } else {
      digits[len] = 0;
      len--;
      if (len < 0) {
        return [1].concat(digits);
      }
    }
  } while (len >= 0);
};

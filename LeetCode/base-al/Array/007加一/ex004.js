// 执行用时为 68 ms 的范例
/*
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
  digits[digits.length - 1] += 1;
  for (i = digits.length - 1; i >= 1; i--) {
    if (digits[i] == 10) {
      digits[i] -= 10;
      digits[i - 1] += 1;
    }
  }

  if (digits[0] == 10) {
    digits[0] -= 9;
    digits.push(0);
  }

  return digits;
};

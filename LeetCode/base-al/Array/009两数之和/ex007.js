// 执行用时为 80 ms 的范例
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  var n = nums.slice(0);
  n.sort(function(a, b) {
    return a - b;
  });

  var i = 0,
    j = nums.length - 1,
    len = j;
  while (1) {
    var num = n[i] + n[j];
    if (num === target) {
      break;
    } else if (num > target) {
      j--;
    } else {
      i++;
      j = j < len ? j++ : len;
    }
  }
  return [nums.indexOf(n[i]), nums.lastIndexOf(n[j])];
};

// 执行用时为 76 ms 的范例
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
  const map = {};
  for (const v of nums) {
    if (v in map) {
      return true;
    }
    map[v] = true;
  }
  return false;
};

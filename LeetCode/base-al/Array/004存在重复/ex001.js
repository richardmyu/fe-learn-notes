// 执行用时为 72 ms 的范例
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
  return [...new Set(nums)].length < nums.length;
};

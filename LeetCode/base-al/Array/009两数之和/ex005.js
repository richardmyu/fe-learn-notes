// 执行用时为 72 ms 的范例
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  var t = {};
  for (var i in nums) {
    if (t[nums[i]]) {
      return [t[nums[i]], i];
    } else {
      t[target - nums[i]] = i;
    }
  }
};

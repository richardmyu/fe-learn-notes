// 执行用时为 68 ms 的范例
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  var len = nums.length;
  var hash = {};
  for (var i = 0; i < len; i++) {
    if (target - nums[i] in hash) {
      return [hash[target - nums[i]], i];
    }
    hash[nums[i]] = i;
  }
};

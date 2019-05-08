// 执行用时为 64 ms 的范例
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  var arr = {};
  for (let i = 0; i < nums.length; i++) {
    arr[nums[i]] = i;
  }
  for (let i = 0; i < nums.length; i++) {
    if (target - nums[i] in arr && i !== arr[target - nums[i]]) {
      return [i, arr[target - nums[i]]];
    }
  }
};

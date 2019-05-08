// 执行用时为 96 ms 的范例
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  var map = new Map();
  for (var i = 0; i < nums.length; i++) {
    var temp = target - nums[i];
    if (map.has(temp)) {
      return [map.get(temp), i];
    }
    map.set(nums[i], i);
  }
};

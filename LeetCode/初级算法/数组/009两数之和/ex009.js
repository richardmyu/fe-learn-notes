// 执行用时为 88 ms 的范例
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  var obj = [];
  for (var i = 0; i < nums.length; i++) {
    var tmp = target - nums[i];
    if (obj[tmp] != null) {
      return [obj[tmp], i];
    }
    obj[nums[i]] = i;
  }
};

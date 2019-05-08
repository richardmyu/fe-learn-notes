// 执行用时为 92 ms 的范例
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  var map = {};
  //     生成一个map，map中存放每个数字和其下标
  //     记result = target - nums[i]，看map中是否存在result
  //     若存在，则返回map[nums[i]]以及i
  for (var i = 0; i < nums.length; i++) {
    var result = target - nums[i];
    if (result in map) {
      return [map[result], i];
    } else {
      map[nums[i]] = i;
    }
  }
};

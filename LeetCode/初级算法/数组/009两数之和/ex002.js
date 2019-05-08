// 执行用时为 60 ms 的范例
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  // 空间换时间
  const maps = {};
  for (let i = 0, len = nums.length; i < len; i++) {
    const anthor = target - nums[i];
    if (maps[anthor] !== undefined) {
      return [maps[anthor], i];
    }
    maps[nums[i]] = i;
  }
  throw new Error("this is no result!");
};

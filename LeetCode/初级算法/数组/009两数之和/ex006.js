// 执行用时为 76 ms 的范例
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  let index = null;
  let hash = [];
  nums.map((item, i) => {
    hash[item] = i;
  });
  for (let i = 0; i < nums.length; i++) {
    index = hash[target - nums[i]];
    if (index !== undefined && index !== i) {
      return [index, i];
    }
  }
};

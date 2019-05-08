// 执行用时为 100 ms 的范例
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  var lens = nums.length,
    i = 0,
    j = 0;
  while (i < lens) {
    if (nums[i] !== 0) {
      nums[j++] = nums[i];
    }
    i++;
  }
  while (j < nums.length) {
    nums[j++] = 0;
  }
  return nums;
};

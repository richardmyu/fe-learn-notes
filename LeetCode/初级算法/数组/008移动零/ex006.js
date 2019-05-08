// 执行用时为 96 ms 的范例
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  var i = 0,
    j = 0;
  for (; j < nums.length; j++) {
    if (nums[j] !== 0) {
      nums[i] = nums[j];
      i++;
    }
  }
  for (; i < j; i++) {
    nums[i] = 0;
  }
  return nums;
};

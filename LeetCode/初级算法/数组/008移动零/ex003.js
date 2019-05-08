// 执行用时为 72 ms 的范例
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  let l = 0;
  let r = 0;
  while (l < nums.length && r < nums.length) {
    while (l < nums.length && nums[l] !== 0) {
      l += 1;
    }
    r = l + 1;
    while (r < nums.length && nums[r] === 0) {
      r += 1;
    }
    if (r < nums.length) {
      nums[l] = nums[r];
      nums[r] = 0;
    }
    l += 1;
  }
};

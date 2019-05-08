// 执行用时为 88 ms 的范例
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  let l = 0;
  let r = 0;
  while (l < nums.length && r < nums.length) {
    while (l < nums.length && r < nums.length && nums[l] !== 0) {
      l += 1;
    }
    r = l + 1;
    while (l < nums.length && r < nums.length && nums[r] === 0) {
      r += 1;
    }
    if (l < nums.length && r < nums.length) {
      let tem = nums[l];
      nums[l] = nums[r];
      nums[r] = tem;
    }
  }
  l += 1;
  r += 1;
};

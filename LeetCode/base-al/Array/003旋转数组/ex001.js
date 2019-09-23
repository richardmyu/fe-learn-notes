// 执行用时为 68 ms 的范例
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
  const mid = nums.length - (k % nums.length) - 1;
  reverse(nums, 0, mid);
  reverse(nums, mid + 1, nums.length - 1);
  nums.reverse();
};

function reverse(nums, l, r) {
  const mid = Math.trunc((r - l + 1) / 2);
  for (let i = 0; i < mid; i++) {
    let tem = nums[r - i];
    nums[r - i] = nums[l + i];
    nums[l + i] = tem;
  }
}

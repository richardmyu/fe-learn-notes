// 执行用时为 108 ms 的范例
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  let play_num = 0;
  for (let i = 0, len = nums.length; i < len; i++) {
    if (i + play_num >= len) {
      console.log(play_num, i);
      return nums;
    }
    if (nums[i] == 0) {
      nums.push(nums.splice(i, 1)[0]);
      i--;
      play_num++;
    }
  }
};

// 执行用时为 68 ms 的范例
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  var k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] != 0) {
      [nums[k], nums[i]] = [nums[i], nums[k]];
      k++;
    }
    //console.log(nums)
  }
};

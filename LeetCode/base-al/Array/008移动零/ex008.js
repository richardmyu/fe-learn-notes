// 执行用时为 104 ms 的范例
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  var n = 0; //0的个数
  var len = nums.length;
  for (var i = 0; i < len; i++) {
    if (nums[i] == 0) {
      //优化部分，push过来的0 不必再循环
      if (i == len - n) {
        break;
      }
      nums.splice(i, 1);
      nums.push(0);
      n++;
      i--;
    }
  }
  return nums;
};

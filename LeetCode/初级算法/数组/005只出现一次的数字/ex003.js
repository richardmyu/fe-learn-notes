// 执行用时为 72 ms 的范例
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
   return nums.reduce((a,b) => a ^ b,0);
};
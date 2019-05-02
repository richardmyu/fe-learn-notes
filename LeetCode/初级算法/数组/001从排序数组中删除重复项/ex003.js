// 执行用时为 84 ms 的范例
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  let len = nums.length;
  for (let i = len - 1; i > 0; i--) {
    if (nums[i - 1] === nums[i]) {
      nums.splice(i - 1, 1);
    }
  }
  return nums.length;
};

console.log(removeDuplicates([1, 1, 2]));
console.log(removeDuplicates([1, 1, 2, 2]));
console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]));
console.log(removeDuplicates([0, 1, 0, 1, 1, 2, 3, 2, 3, 4]));

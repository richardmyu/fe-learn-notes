// 执行用时为 92 ms 的范例
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  if (!nums || !nums.length) return 0;

  let current
  let i = 0;

  while (nums[i] != null) {
    if (current === nums[i]) {
      nums.splice(i, 1);
    } else {
      current = nums[i];
      i++;
    }
  }
  return nums.length;
};

console.log(removeDuplicates([1, 1, 2]));
console.log(removeDuplicates([1, 1, 2, 2]));
console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]));

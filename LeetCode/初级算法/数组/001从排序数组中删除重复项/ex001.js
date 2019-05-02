// 执行用时为 72 ms 的范例
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  if (!nums.length) return 0;
  let i = 0;
  for (let j = 0; j < nums.length; j++) {
    if (nums[i] !== nums[j]) {
      nums[++i] = nums[j]
    }
  }
  return i + 1;
};

console.log(removeDuplicates([1, 1, 2]));
console.log(removeDuplicates([1, 1, 2, 2]));
console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]));
console.log(removeDuplicates([0, 1, 0, 1, 1, 2, 3, 2, 3, 4]));
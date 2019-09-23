// 执行用时为 88 ms 的范例
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
  let newArray = [];
  for (let i = 0; i < nums1.length; i++) {
    if (nums2.indexOf(nums1[i]) != -1) {
      nums2.splice(nums2.indexOf(nums1[i]), 1);
      newArray.push(nums1[i]);
    }
  }
  return newArray;
};

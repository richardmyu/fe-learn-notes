// 执行用时为 96 ms 的范例
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
  let res = [];
  for (let i in nums1) {
    if (nums2.indexOf(nums1[i]) != -1) {
      res.push(nums1[i]);
      nums2[nums2.indexOf(nums1[i])] = null;
    }
  }
  return res;
};

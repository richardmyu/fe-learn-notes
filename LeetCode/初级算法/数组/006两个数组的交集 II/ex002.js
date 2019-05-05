// 执行用时为 72 ms 的范例
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
  const map = {};
  if (nums1.length > nums2.length) [nums1, nums2] = [nums2, nums1];
  nums1.forEach(num => {
    if (!map[num]) map[num] = 1;
    else map[num]++;
  });
  return nums2.filter(num => {
    if (map[num] > 0) {
      map[num]--;
      return true;
    }
    return false;
  });
};

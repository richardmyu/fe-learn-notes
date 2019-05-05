// 执行用时为 76 ms 的范例
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
  const map = {};
  const result = [];
  nums1.forEach(num => {
    if (!map[num]) map[num] = 1;
    else map[num]++;
  });
  nums2.forEach(num => {
    if (map[num] > 0) {
      result.push(num);
      map[num]--;
    }
  });
  return result;
};

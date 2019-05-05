// 执行用时为 92 ms 的范例
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
  const map = {};
  const res = [];
  nums1.forEach(function(v) {
    map[v] ? map[v]++ : (map[v] = 1);
  });

  nums2.forEach(function(v) {
    if (map[v]) {
      res.push(v);
      map[v]--;
    }
  });
  return res;
};

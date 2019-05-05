// 执行用时为 80 ms 的范例
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
  var map = {};

  for (i = 0; i < nums1.length; i++) {
    var x = nums1[i];
    if (!map.hasOwnProperty(x)) {
      map[x] = 1;
    } else {
      map[x]++;
    }
  }
  var result = [];
  for (i = 0; i < nums2.length; i++) {
    var x = nums2[i];
    if (!map.hasOwnProperty(x)) {
      continue;
    } else {
      if (map[x] == 0) {
        continue;
      } else {
        result.push(x);
        map[x]--;
      }
    }
  }
  return result;
};

// 执行用时为 60 ms 的范例
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
  const process = function(nums) {
    return nums.reduce((obj, key) => {
      if (key in obj) {
        obj[key]++;
      } else {
        obj[key] = 1;
      }
      return obj;
    }, {});
  };
  var num1Map = process(nums1);
  var num2Map = process(nums2);
  var ret = [];
  Object.keys(num1Map).forEach(key => {
    if (key in num1Map && key in num2Map) {
      ret.push(...Array(Math.min(num1Map[key], num2Map[key])).fill(key));
    }
  });
  return ret;
};

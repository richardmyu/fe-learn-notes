// 执行用时为 84 ms 的范例
var twoSum = (nums, target) => {
  const map = {};
  const { length } = nums;

  for (let i = 0; i < length; i++) {
    const complement = target - nums[i];

    if (typeof map[complement] !== "undefined" && map[complement] !== i) {
      return [map[complement], i];
    }

    map[nums[i]] = i;
  }

  return [];
};

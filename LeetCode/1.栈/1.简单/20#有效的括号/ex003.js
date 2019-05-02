// 执行用时为 64 ms 的范例  0.08
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  let valid = true;
  const stack = [];
  const mapper = {
    '{': "}",
    "[": "]",
    "(": ")"
  }

  for (let i in s) {
    const v = s[i];
    if (['(', '[', '{'].indexOf(v) > -1) {
      stack.push(v);
    } else {
      const peak = stack.pop();
      if (v !== mapper[peak]) {
        valid = false
      }
    }
  }

  if (stack.length > 0) return false;

  return valid;
};
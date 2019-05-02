// 执行用时为 80 ms 的范例  0.12
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  if (typeof s !== 'string') {
    return false;
  }
  let start = [],
    x = 0,
    left = {
      ')': '(',
      ']': '[',
      '}': '{'
    };
  for (let i = 0; i < s.length; i++) {
    if (!left[s[i]]) {
      start.push(s[i]);
      // x++;
    } else {
      let y = start.pop();
      if (left[s[i]] !== y) {
        return false;
      }
    }
  }
  if (!start.length) {
    return true;
  }
  return false;
};
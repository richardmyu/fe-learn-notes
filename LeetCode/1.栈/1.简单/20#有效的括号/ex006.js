// 执行用时为 76 ms 的范例  0.12
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  let parenMap = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  let i = 0,
    c = '',
    len = s.length,
    stack = [];
  for (; i < len; i++) {
    c = s[i];
    if (parenMap[c]) {
      if (parenMap[c] !== stack.pop()) {
        return false;
      }
    } else {
      stack.push(c);
    }
  }

  return !stack.length;
};

var isValid = function (s) {
  let length;
  do {
    length = s.length;
    s = s.replace('[]', '').replace('{}', '').replace('()', '');
  } while (length !== s.length);

  return !s.length;
};
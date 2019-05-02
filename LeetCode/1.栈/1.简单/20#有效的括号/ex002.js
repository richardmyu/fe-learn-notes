// 执行用时为 60 ms 的范例  0.28
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  var map = {
    '{': -1,
    '}': 1,
    '(': -2,
    ')': 2,
    '[': -3,
    ']': 3
  }

  var stack = [];
  for (var i = 0; i < s.length; i++) {
    if (map[s[i]] < 0) {
      stack.push(s[i]);
    } else {
      var c = stack.pop();
      if (map[c] + map[s[i]] !== 0) return false;
    }
  }

  if (stack.length > 0) return false;
  return true;
};

console.log(isValid("("));
console.log(isValid("()"));
console.log(isValid("(()"));
console.log(isValid("([)]"));
console.log(isValid("()[]{}"));
console.log(isValid("(]"));
console.log(isValid("{[]}"));
console.log(isValid(""));
console.log(isValid("(([]){})"));
console.log(isValid("{}{}()[]"));
console.log("********************");
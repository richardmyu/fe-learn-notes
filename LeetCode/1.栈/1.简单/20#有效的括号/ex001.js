// 执行用时为 56 ms 的范例  0.28
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  var stack = [];
  var maps = {
    "[": "]",
    "{": "}",
    "(": ")",
  };

  for (var i = 0; i < s.length; i++) {
    if (s[i] === "[" || s[i] === "{" || s[i] === "(") {
      stack.push(s[i]);
    } else {
      var key = stack.pop();
      if (maps[key] !== s[i]) {
        return false;
      }
    }
  }
  if (!stack.length) {
    return true;
  }
  return false;
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
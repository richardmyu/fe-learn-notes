// 执行用时为 68 ms 的范例  0.49
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  var brackets_stack = [];
  for (var i = 0; i < s.length; i++) {
    if (s[i] == '{') {
      brackets_stack.push('}');
    } else if (s[i] == '[') {
      brackets_stack.push(']');
    } else if (s[i] == '(') {
      brackets_stack.push(')');
    } else if (brackets_stack.pop() != s[i]) {
      return false;
    }
  }
  return !brackets_stack.length;
};

console.log(isValid('[{}]'));
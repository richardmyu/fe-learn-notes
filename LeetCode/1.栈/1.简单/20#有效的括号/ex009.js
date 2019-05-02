// 执行用时为 88 ms 的范例  11.43
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const dict = {
    '(': ')',
    '[': ']',
    '{': '}'
  };
  let stack = [];
  let str = s.split('');
  let i;
  for (i = 0; i < str.length; i++) {
    if (dict[str[i]]) stack.push(str[i])
    if (str[i] === dict[stack[stack.length - 1]]) {
      stack.pop()
    } else {
      if (!dict[str[i]]) return false;
    }
  }
  return !stack.length

}
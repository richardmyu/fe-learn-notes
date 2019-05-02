// 执行用时为 96 ms 的范例  10.34
/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  let s_arr = s.split('');
  let stack = [];
  let flag = true;
  s_arr.forEach(str => {
    if (str == '(' || str == '{' || str == '[') {
      stack.push(str);
      return;
    } else if (str == '}' || str == ')' || str == ']') {
      let stackPop = stack[stack.length - 1];
      if (str == '}' && stackPop !== '{') {
        flag = false;
        return;
      }
      if (str == ']' && stackPop !== '[') {
        flag = false;
        return;
      }
      if (str == ')' && stackPop !== '(') {
        flag = false;
        return;
      }

      stack.pop();
    } else {
      return;
    }
  });
  if (stack.length > 0) {
    return false;
  }
  return flag;
};
// isValid('{[]}');
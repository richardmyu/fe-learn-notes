// 执行用时为 72 ms 的范例  0.61
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  var arr = [],
    top;
  var obj = {
    ")": "(",
    "]": "[",
    "}": "{"
  }
  for (var i = 0, l = s.length; i < l; i++) {
    if (")]}".indexOf(s[i]) != -1) {
      if (arr.length != 0) {
        top = arr.pop();
      } else {
        top = '#';
      }
      if (top != obj[s[i]]) {
        return false;
      }
    } else {
      arr.push(s[i]);
    }
  }
  return arr.length == 0;

};
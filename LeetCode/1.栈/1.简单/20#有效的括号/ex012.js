// 执行用时为 100 ms 的范例  7.01
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  var str = s.charAt(0);
  var json = {
    "(": ")",
    "{": "}",
    "[": "]"
  };
  for (var i = 1; i < s.length; i++) {
    if (json[str.charAt(str.length - 1)] == s.charAt(i)) {
      str = str.slice(0, str.length - 1);
    } else {
      str += s.charAt(i);
    }
  }
  return str == "";
};
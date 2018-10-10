/*给定一个字符串，找出不含有重复字符的最长子串的长度。

示例：

给定 "abcabcbb" ，没有重复字符的最长子串是 "abc" ，那么长度就是3。

给定 "bbbbb" ，最长的子串就是 "b" ，长度是1。

给定 "pwwkew" ，最长子串是 "wke" ，长度是3。请注意答案必须是一个子串，"pwke" 是 子序列  而不是子串。*/

var lengthOfLongestSubstring = function (s) {
  //ary存储不重复子串
  var ary = [];
  var str = '';
  for (var i = 0; i < s.length; i++) {
    for (var j = i + 1; j < s.length; j++) {
      //用来存储被判断字符
      str = s.slice(i, j);
      //判断str在s中是否有重复字符
      if (str.includes(s[j])) {
        //若有重复，将重复之前的子串存入ary
        ary[i] = s.slice(i, j);
        break;
      } else {
        //一直到最后没有重复，则放入ary
        if (j === (s.length - 1)) {
          ary[i] = s.slice(i, s.length);
        }
        //当前字符没有重复，进行下一位字符重复判断
        continue;
      }
    }
  }

  str = ary.sort(function (a, b) {
    return b.length - a.length;
  })[0];

  return str ? str.length : s.length;
};

// console.log(lengthOfLongestSubstring(''));
// console.log(lengthOfLongestSubstring('a'));
// console.log(lengthOfLongestSubstring('aa'));
// console.log(lengthOfLongestSubstring('ab'));
// console.log(lengthOfLongestSubstring('aab'));
// console.log(lengthOfLongestSubstring('abb'));
// console.log(lengthOfLongestSubstring('abcabcbb'));
console.log(lengthOfLongestSubstring('weepw'));

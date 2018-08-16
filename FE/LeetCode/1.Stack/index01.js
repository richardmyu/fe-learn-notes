/*
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
注意空字符串可被认为是有效字符串。

示例 1:

输入: "()"
输出: true
示例 2:

输入: "()[]{}"
输出: true
示例 3:

输入: "(]"
输出: false
示例 4:

输入: "([)]"
输出: false
示例 5:

输入: "{[]}"
输出: true
*/

var isValid = function (s) {
  console.log('s:'+s);
  //str符号集合
  let str = '([{)]}';
  //ary存储闭合符号的index
  let ary = [];
  let flag = false;
  let length = s.length;
  let _s = s;
  console.log('length:' + length, ' _s:' + s);

  (
    function strFind(s){
      //s长度为奇数必有不闭合的符号，返回false
      if (s.length === 0) {
        return !flag;
      }

      if (s.length % 2) {
        return flag;
      }

      outer:
        for (let i = 0; i < s.length; i++) {
          for (let j = 0; j < 3; j++) {

            //判断是否是指定字符集合
            if (s[i] === str[j]) {

              //若是指定符号，存下起始index
              ary[0] = s.indexOf(s[i]);

              //判断该符号是否闭合
              if (s.includes(str[j + 3])) {

                //若有闭合，存下符号闭合index
                ary[1] = s.indexOf(str[j + 3]);

                //再分别处理闭合符号内的符号和闭合符号外的符号（如果有的话）

                //闭合符号内是否有符号（是否闭合）
                if (ary[1] === (ary[0] + 1)) {

                  //没有其他符号，返回true
                  //直接return失败？？？
                  break outer;
                } else {

                  //有其他符号，判断是否闭合
                  s = _s.slice(ary[0] + 1, ary[1]);

                  strFind(s);
                }

                //闭合符号外的符号处理
                if (ary[1] !== (length - 1)) {
                  s = _s.slice(ary[1]);
                  strFind(s);
                }
              } else {
                return flag;
              }
            }
          }
        }
    }
  )(s);
  return !flag;
};


// console.log(isValid(''));
// console.log(isValid('()'));
// console.log(isValid('([)'));
// console.log(isValid('(['));
// console.log(isValid('([)]'));
// console.log(isValid('()[]{}'));
// console.log(isValid('{()}'));
// console.log(isValid('[]'));
// console.log(isValid('[()]'));
// console.log(isValid('()('));
console.log(isValid('(()('));


/*let str = '([{)]}';
let ary = [];
let flag = false;
if (s.length % 2) {
  return flag;
}
if (s.length === 0) {
  return !flag;
}
outer:
  for (let i = 0; i < s.length; i++) {
    for (let j = 0; j < 3; j++) {
      if (s[i] === str[j]) {
        ary[0] = s.indexOf(s[i]);
        if (s.includes(str[j + 3])) {
          ary[1] = s.indexOf(str[j + 3]);
          if (ary[1] === (ary[0] + 1)) {
            break outer;
          } else {
            s = s.slice(ary[0] + 1, ary[1]);
            isValid(s);
          }
          if (ary[1] !== (s.length + 1)) {
            s = s.slice(ary[1] + 1);
            isValid(s);
          }
        } else {
          return flag;
        }
      }
    }
  }
return !flag;*/

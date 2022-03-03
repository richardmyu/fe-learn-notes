/**
 * 平衡圆括号（只是确认左括号和右括号一样多）
 */

const Stack = require('./stack');

function isBreaketBalanced(s) {
  let reg = /[^()]/g;

  if (reg.test(s)) {
    throw new Error('参数是仅由圆括号组成的字符串');
  }

  let stack = new Stack();

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      stack.push('(');
    } else {
      if (!stack.pop()) {
        return false;
      }
    }
  }
  return stack.isEmpty();
}

console.log(isBreaketBalanced('()()'));
console.log(isBreaketBalanced('()(())'));
console.log(isBreaketBalanced('()(()'));
console.log(isBreaketBalanced('(()(()))'));

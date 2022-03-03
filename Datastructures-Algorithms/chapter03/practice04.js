/**
 * 平衡括号 ((),[],{})
 */

const Stack = require('./stack');

function isBreaketBalanced(s) {
  const stack = new Stack();
  const start_breaket = `([{`;
  const end_breaket = `)]}`;

  for (let i = 0; i < s.length; i++) {
    if (start_breaket.includes(s[i])) {
      stack.push(s[i]);
    } else {
      if (start_breaket.indexOf(stack.pop()) !== end_breaket.indexOf(s[i])) {
        return false;
      }
    }
  }

  return stack.isEmpty();
}

console.log(isBreaketBalanced('(()'));
console.log(isBreaketBalanced('(])'));
console.log(isBreaketBalanced('()[]{}'));
console.log(isBreaketBalanced('()[]{(())}'));
console.log(isBreaketBalanced('()[]{(()}'));

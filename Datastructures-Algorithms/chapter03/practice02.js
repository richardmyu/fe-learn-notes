/**
 * 任意进制 (16 进制以内)
 */

const Stack = require('./stack');

function baseConverter(decNumber, base) {
  let remStack = new Stack();
  let baseString = '';
  let digits = '0123456789ABCDEF';

  if (base < 2 || base > 16 || !Number.isInteger(base)) {
    throw new Error('参数有误，base 只能是 【2，16]')
  }

  while (decNumber > 0) {
    remStack.push(decNumber % base);
    decNumber = Math.floor(decNumber / base);
  }

  while (!remStack.isEmpty()) {
    baseString += digits[remStack.pop()];
  }

  return baseString;
}

console.log(baseConverter(100345, 2)); // 11000011111111001
console.log(baseConverter(100345, 8)); // 303771
console.log(baseConverter(100345, 16)); // 187F9

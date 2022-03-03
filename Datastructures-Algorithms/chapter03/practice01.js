/**
 * 从十进制到二进制 (整数)
 */

const Stack = require('./stack');

function divideBy2(decNumber) {
  let remStack = new Stack();
  let binaryString = '';

  // 辗转相除法
  while (decNumber > 0) {
    remStack.push(decNumber % 2);
    decNumber = Math.floor(decNumber / 2);
  }

  while (!remStack.isEmpty()) {
    binaryString += remStack.pop().toString();
  }

  return binaryString;
}

console.log(divideBy2(233)); // 11101001
console.log(divideBy2(10)); // 1010
console.log(divideBy2(1000)); // 1111101000

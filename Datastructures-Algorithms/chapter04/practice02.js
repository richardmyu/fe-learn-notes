/**
 * 从十进制到二进制 (正小数)
 * 需要用到队列
 */

const Stack = require('../chapter03/stack');

function divideBy2(decNumber) {
  // let remStack = new Stack();
  // let binaryString = '0.';

  // while (!Number.isInteger(decNumber)) {
  //   let rem = decNumber * 2;
  //   console.log(rem, Math.floor(rem));
  //   remStack.push(Math.floor(rem));
  //   if (rem <= 1) {
  //     decNumber = rem;
  //   } else {
  //     decNumber = rem - Math.floor(rem);
  //   }

  // }

  // while (!remStack.isEmpty()) {
  //   binaryString += remStack.pop().toString();
  // }

  // return binaryString;
}

// console.log(divideBy2(0.125)); // 0.001
console.log(divideBy2(0.13)); // 0.001

/**
 * 从十进制到二进制 (正小数)
 */

const Queue = require('../chapter04/queue.js');

function divideBy2(decNumber) {
  let remQueue = new Queue();
  let binaryString = '0.';

  while (!Number.isInteger(decNumber)) {
    let rem = decNumber * 2;
    remQueue.enqueue(Math.floor(rem));

    if (rem <= 1) {
      decNumber = rem;
    } else {
      decNumber = rem - Math.floor(rem);
    }

  }

  while (!remQueue.isEmpty()) {
    binaryString += remQueue.dequeue().toString();
  }

  return binaryString;
}

console.log(divideBy2(0.125)); // 0.001
console.log(divideBy2(0.13));
// 0.00100001010001111010111000010100011110101110000101001
console.log(divideBy2(0.22));
// 0.0011100001010001111010111000010100011110101110000101001
